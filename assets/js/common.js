/* Shared helpers: storage, auth, cart, orders, header/footer, toasts. */
(function () {
  const D = window.QA_DATA;

  const KEYS = {
    session: 'qa_session',
    registered: 'qa_registered_users',
    profiles: 'qa_profiles',
    lastUser: 'qa_last_username',
    cart: (u) => 'qa_cart_' + u,
    orders: (u) => 'qa_orders_' + u
  };

  // ---------- Storage (safe wrappers) ----------
  const Store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
    },
    resetAll() {
      try {
        Object.keys(localStorage).filter((k) => k.startsWith('qa_')).forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* ignore */ }
    }
  };

  // ---------- Utils ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const money = (n) => '$' + Number(n).toFixed(2);
  const param = (name) => new URLSearchParams(location.search).get(name);
  const escapeHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const stars = (rating) => {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  };

  // ---------- Users & Auth ----------
  function allUsers() {
    const registered = Store.get(KEYS.registered, []);
    const profiles = Store.get(KEYS.profiles, {});
    return D.users.concat(registered).map((u) => {
      const overrides = profiles[u.username] || {};
      return Object.assign({}, u, overrides, {
        address: Object.assign({}, u.address || {}, overrides.address || {}),
        preferences: Object.assign(
          { newsletter: true, theme: 'light', language: 'en', notifyEmail: true, notifySms: false, notifyPush: true },
          u.preferences || {}, overrides.preferences || {}
        )
      });
    });
  }

  function findUser(username) {
    return allUsers().find((u) => u.username === username) || null;
  }

  function currentUser() {
    const session = Store.get(KEYS.session, null);
    return session ? findUser(session.username) : null;
  }

  function updateProfile(username, changes) {
    const profiles = Store.get(KEYS.profiles, {});
    const existing = profiles[username] || {};
    const merged = Object.assign({}, existing, changes);
    if (changes.address) merged.address = Object.assign({}, existing.address || {}, changes.address);
    if (changes.preferences) merged.preferences = Object.assign({}, existing.preferences || {}, changes.preferences);
    profiles[username] = merged;
    Store.set(KEYS.profiles, profiles);
  }

  function register(user) {
    const registered = Store.get(KEYS.registered, []);
    registered.push(Object.assign({ status: 'active' }, user));
    Store.set(KEYS.registered, registered);
  }

  async function login(username, password, remember) {
    const user = findUser(username);
    if (user && user.behavior === 'slow') await sleep(3000);
    if (!username) return { ok: false, error: 'Username is required' };
    if (!password) return { ok: false, error: 'Password is required' };
    if (!user || user.password !== password) {
      return { ok: false, error: 'Username and password do not match any user in this service' };
    }
    if (user.status === 'locked') return { ok: false, error: 'Sorry, this user has been locked out.' };
    Store.set(KEYS.session, { username: user.username, loggedInAt: new Date().toISOString() });
    if (remember) Store.set(KEYS.lastUser, user.username); else Store.remove(KEYS.lastUser);
    return { ok: true, user };
  }

  function logout() {
    Store.remove(KEYS.session);
    location.href = 'login.html?logged_out=1';
  }

  // Redirect to login if not authenticated. Returns the user otherwise.
  function requireAuth() {
    const user = currentUser();
    if (!user) {
      const target = location.pathname.split('/').pop() + location.search;
      location.replace('login.html?redirect=' + encodeURIComponent(target || 'shop.html'));
      return null;
    }
    return user;
  }

  // ---------- Products ----------
  const getProduct = (id) => D.products.find((p) => p.id === Number(id)) || null;

  // ---------- Cart ----------
  const Cart = {
    _key() { const u = currentUser(); return u ? KEYS.cart(u.username) : null; },
    items() { const k = this._key(); return k ? Store.get(k, []) : []; },
    save(items) { const k = this._key(); if (k) Store.set(k, items); renderCartBadge(); },
    count() { return this.items().reduce((n, i) => n + i.qty, 0); },
    lineKey(id, options) { return id + '|' + (options.size || '') + '|' + (options.color || ''); },
    add(productId, qty, options) {
      options = options || {};
      const items = this.items();
      const key = this.lineKey(productId, options);
      const existing = items.find((i) => i.key === key);
      const product = getProduct(productId);
      const max = product ? product.stock : 99;
      if (existing) existing.qty = Math.min(existing.qty + (qty || 1), max);
      else items.push({ key, productId: Number(productId), qty: Math.min(qty || 1, max), size: options.size || null, color: options.color || null });
      this.save(items);
    },
    setQty(key, qty) {
      let items = this.items();
      const item = items.find((i) => i.key === key);
      if (!item) return;
      if (qty <= 0) items = items.filter((i) => i.key !== key);
      else item.qty = qty;
      this.save(items);
    },
    remove(key) { this.save(this.items().filter((i) => i.key !== key)); },
    removeProduct(productId) { this.save(this.items().filter((i) => i.productId !== Number(productId))); },
    has(productId) { return this.items().some((i) => i.productId === Number(productId)); },
    clear() { this.save([]); },
    coupon() { const u = currentUser(); return u ? Store.get('qa_coupon_' + u.username, null) : null; },
    setCoupon(code) { const u = currentUser(); if (u) { if (code) Store.set('qa_coupon_' + u.username, code); else Store.remove('qa_coupon_' + u.username); } },
    detailed() {
      return this.items().map((i) => {
        const p = getProduct(i.productId);
        return p ? Object.assign({}, i, { product: p, lineTotal: +(p.price * i.qty).toFixed(2) }) : null;
      }).filter(Boolean);
    },
    totals(shippingMethodId) {
      const lines = this.detailed();
      const subtotal = +lines.reduce((s, l) => s + l.lineTotal, 0).toFixed(2);
      const code = this.coupon();
      const coupon = code ? D.coupons[code] : null;
      let discount = 0;
      if (coupon && coupon.type === 'percent' && (!coupon.min || subtotal >= coupon.min)) {
        discount = +(subtotal * coupon.value / 100).toFixed(2);
      }
      const method = D.shippingMethods.find((m) => m.id === (shippingMethodId || 'standard')) || D.shippingMethods[0];
      let shipping = lines.length ? method.price : 0;
      if (method.id === 'standard' && subtotal >= D.FREE_SHIPPING_THRESHOLD) shipping = 0;
      if (coupon && coupon.type === 'shipping') shipping = 0;
      const tax = +((subtotal - discount) * D.TAX_RATE).toFixed(2);
      const total = +(subtotal - discount + shipping + tax).toFixed(2);
      return { lines, subtotal, discount, shipping, tax, total, coupon: code, method };
    }
  };

  // ---------- Orders ----------
  const Orders = {
    _key() { const u = currentUser(); return u ? KEYS.orders(u.username) : null; },
    all() { const k = this._key(); return k ? Store.get(k, []) : []; },
    add(order) { const k = this._key(); if (!k) return; const list = this.all(); list.unshift(order); Store.set(k, list); },
    find(id) { return this.all().find((o) => o.id === id) || null; },
    cancel(id) {
      const k = this._key(); if (!k) return;
      const list = this.all();
      const o = list.find((x) => x.id === id);
      if (o) { o.status = 'Cancelled'; Store.set(k, list); }
    }
  };

  // ---------- Toasts ----------
  function toast(message, type) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = 'toast toast-' + (type || 'info');
    el.setAttribute('role', 'status');
    el.setAttribute('data-testid', 'toast');
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }

  // ---------- Header / footer ----------
  const PLAYGROUND = [
    { href: 'elements.html', label: 'Elements & Forms' },
    { href: 'tables.html', label: 'Web Tables' },
    { href: 'interactions.html', label: 'Interactions' },
    { href: 'dynamic.html', label: 'Dynamic & Waits' },
    { href: 'frames.html', label: 'Frames, Windows & Shadow DOM' }
  ];

  function renderHeader() {
    const host = document.getElementById('site-header');
    if (!host) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const user = currentUser();
    const active = (href) => (href === page ? ' class="active" aria-current="page"' : '');
    const playActive = PLAYGROUND.some((p) => p.href === page);

    host.className = 'site-header';
    host.setAttribute('data-testid', 'site-header');
    host.innerHTML = `
      <div class="container">
        <a href="index.html" class="logo" id="logo" data-testid="logo"><span class="logo-mark">QA</span> Automation Playground</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-nav">☰</button>
        <ul class="main-nav" id="main-nav" role="menubar">
          <li><a href="index.html"${active('index.html')} id="nav-home">Home</a></li>
          <li class="has-dropdown" id="nav-playground-item">
            <button class="nav-button${playActive ? ' active' : ''}" id="nav-playground" aria-haspopup="true" aria-expanded="false">Playground ▾</button>
            <ul class="nav-dropdown" id="playground-menu" role="menu">
              ${PLAYGROUND.map((p) => `<li role="none"><a role="menuitem" href="${p.href}"${active(p.href)}>${p.label}</a></li>`).join('')}
            </ul>
          </li>
          <li><a href="shop.html"${active('shop.html')} id="nav-shop">Shop</a></li>
          <li><a href="orders.html"${active('orders.html')} id="nav-orders">Orders</a></li>
        </ul>
        <div class="header-actions">
          ${user ? `
            <a href="cart.html" class="cart-link" id="cart-link" data-testid="cart-link" aria-label="Shopping cart">🛒<span class="cart-badge hidden" id="cart-badge" data-testid="cart-badge"></span></a>
            <div class="has-dropdown" id="user-menu">
              <button class="nav-button" id="user-menu-button" aria-haspopup="true" aria-expanded="false" data-testid="user-menu-button">👤 <span id="header-username">${escapeHtml(user.firstName || user.username)}</span> ▾</button>
              <ul class="nav-dropdown" role="menu" id="user-dropdown">
                <li role="none"><a role="menuitem" href="profile.html" id="menu-profile">My Profile</a></li>
                <li role="none"><a role="menuitem" href="orders.html" id="menu-orders">My Orders</a></li>
                <li role="none"><a role="menuitem" href="#" id="logout-link" data-testid="logout">Log out</a></li>
              </ul>
            </div>` : `
            <a href="register.html" class="btn btn-sm" id="header-register">Sign up</a>
            <a href="login.html" class="btn btn-sm btn-primary" id="header-login" data-testid="header-login">Log in</a>`}
        </div>
      </div>`;

    const toggle = $('#menu-toggle', host);
    toggle.addEventListener('click', () => {
      const nav = $('#main-nav', host);
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    $$('.has-dropdown > .nav-button', host).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const li = btn.parentElement;
        const open = !li.classList.contains('open');
        $$('.has-dropdown.open', host).forEach((x) => x.classList.remove('open'));
        li.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
      });
    });
    document.addEventListener('click', () => $$('.has-dropdown.open', host).forEach((x) => x.classList.remove('open')));
    const logoutLink = $('#logout-link', host);
    if (logoutLink) logoutLink.addEventListener('click', (e) => { e.preventDefault(); logout(); });
    renderCartBadge();
  }

  function renderCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const n = Cart.count();
    badge.textContent = n;
    badge.classList.toggle('hidden', n === 0);
  }

  function renderFooter() {
    const host = document.getElementById('site-footer');
    if (!host) return;
    host.className = 'site-footer';
    host.innerHTML = `
      <div class="container row">
        <span>QA Automation Playground — a practice site for UI test automation. All data is stored in your browser.</span>
        <span class="spacer"></span>
        <button class="btn btn-sm" id="reset-data" data-testid="reset-data" title="Clears the cart, orders, registered users and profile edits">Reset all data</button>
      </div>`;
    $('#reset-data', host).addEventListener('click', () => {
      Store.resetAll();
      toast('All local data was reset', 'success');
      setTimeout(() => location.reload(), 600);
    });
  }

  function productImage(p, cls) {
    const user = currentUser();
    // problem_user sees the same image for every product.
    const shown = user && user.behavior === 'problem' ? { emoji: '🐞', color: '#ffe3e3' } : p;
    return `<div class="product-image ${cls || ''}" style="background:${shown.color}">
      <span role="img" aria-label="${escapeHtml(p.name)}" class="product-emoji">${shown.emoji}</span>
      ${p.tag ? `<span class="badge product-tag ${p.tag === 'Sale' ? 'badge-danger' : p.tag === 'New' ? 'badge-info' : 'badge-warning'}">${p.tag}</span>` : ''}
    </div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });

  window.QA = {
    Store, KEYS, $, $$, money, param, escapeHtml, sleep, stars,
    allUsers, findUser, currentUser, updateProfile, register, login, logout, requireAuth,
    getProduct, Cart, Orders, toast, renderCartBadge, productImage
  };
})();
