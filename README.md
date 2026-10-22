<div align="center">

# 🧪 QA Automation Playground

**A practice website for learning UI test automation, with realistic flows and deliberately tricky edge cases.**

Practice with Selenium, Playwright, Cypress, WebdriverIO or any other UI automation tool.

[![Live demo](https://img.shields.io/badge/demo-auto--test--site.vercel.app-000?logo=vercel)](https://auto-test-site.vercel.app)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![No backend](https://img.shields.io/badge/backend-none-brightgreen)

[**🚀 Open the live site**](https://auto-test-site.vercel.app) · [Features](#-features) · [Test accounts](#-test-accounts) · [Test data](#-test-data) · [Example tests](#-example-tests) · [Run locally](#-run-locally)

</div>

---

## ✨ Why this project?

Most demo sites cover either a happy-path shop or a page of isolated widgets. This one covers both:

- 🛒 **A full e-commerce flow**: register → log in → browse → cart → multi-step checkout → order history → profile.
- 🧩 **Five widget pages** covering alerts, iframes, shadow DOM, drag & drop, flaky AJAX, stale elements, infinite scroll and more.
- 👤 **Built-in test personas** that behave differently: locked out, slow, buggy, or failing on the server.
- 🎯 **Stable test hooks**: about 280 unique `data-testid` attributes plus semantic IDs and ARIA roles, with some sections left without hooks on purpose so you have to work for the locator.
- ⚡ **Zero setup**: plain HTML/CSS/JS with no framework, build step or backend. State is kept in `localStorage`, and one button resets it between runs.

---

## 📚 Features

### 🛍️ User flows

| Page | What you can practise |
|------|------------------------|
| **[Home](https://auto-test-site.vercel.app/index.html)** `index.html` | Landing page, test account table, test data reference, links to every feature |
| **[Login](https://auto-test-site.vercel.app/login.html)** `login.html` | Required-field validation, wrong credentials, locked user, slow login (~3 s), *Remember me*, *Forgot password* panel, redirect back to the protected page you came from (`?redirect=`), logout message |
| **[Sign up](https://auto-test-site.vercel.app/register.html)** `register.html` | Per-field validation, live password-strength meter, password rules (8+ chars, upper, lower, digit, symbol), confirm password, duplicate username/email checks, terms checkbox; new accounts can log in straight away |
| **[Shop](https://auto-test-site.vercel.app/shop.html)** `shop.html` | 24 products in 6 categories: debounced search, category and price filters, sorting, pagination, grid/list toggle, loading spinner, “no results” state, out-of-stock items, add/remove from cart |
| **[Product](https://auto-test-site.vercel.app/product.html?id=1)** `product.html?id=N` | Query-string routing, size dropdown, colour swatches, quantity stepper limited by stock, stock status, tabs, reviews, *Product not found* state |
| **[Cart](https://auto-test-site.vercel.app/cart.html)** `cart.html` | Quantity updates, remove line, clear cart, coupons (valid, minimum spend, expired, invalid), subtotal / discount / shipping / tax / total calculations, empty state |
| **[Checkout](https://auto-test-site.vercel.app/checkout.html)** `checkout.html` | Multi-step wizard (Shipping → Payment → Review → Confirmation), address and card validation, 3 shipping methods, test cards for declined and insufficient-funds payments, terms checkbox, order number |
| **[Orders](https://auto-test-site.vercel.app/orders.html)** `orders.html` | Order history, expandable order details, status filter, cancel order, empty state |
| **[Profile](https://auto-test-site.vercel.app/profile.html)** `profile.html` | Read-only/edit mode (disabled `fieldset`), personal info, address, change password, preferences (newsletter, theme, language, notifications), 2FA toggle switch, avatar upload, type-`RESET`-to-confirm modal |

> 🔒 Shop, cart, checkout, orders and profile are **auth-protected**. Opening them while logged out redirects to the login page, and logging in sends you back where you started.

### 🧩 Playground pages

<details open>
<summary><b>🔤 <a href="https://auto-test-site.vercel.app/elements.html">Elements & Forms</a></b> (<code>elements.html</code>)</summary>

- **Text inputs**: text, email, password, number and textarea, with live output on every keystroke
- **Buttons**: click, double-click, right-click and disabled buttons
- **Checkboxes**: *Select all* group, a disabled option, a pre-checked option, checkboxes without IDs, toggle switches
- **Radio buttons** and **dropdowns**: native single/multi `<select>`, a custom (non-native) dropdown, autocomplete
- **Special inputs**: date, time, datetime-local, month, week, colour, range, tel, url and search
- **File upload**: single, multiple, and a hidden `<input type="file">`
- **Links**: internal and external links, a JavaScript link, and a **broken link** that leads to the 404 page
- **Images**, including a **broken image** to detect via `naturalWidth`
- **Lists & text**: ordered, nested and description lists
- **Locator challenges**: cards with no IDs (use XPath axes, `:has()` or text matching), label/value pairs, deeply nested elements, elements with near-identical attributes
- **Practice form**: a full form using native HTML5 validation that shows the submitted values as JSON
</details>

<details open>
<summary><b>📊 <a href="https://auto-test-site.vercel.app/tables.html">Web Tables</a></b> (<code>tables.html</code>)</summary>

- **Static table** with `thead`/`tbody`/`tfoot`. Try “get the price of Product C” or “sum the Qty column”.
- **Employees table** with sorting, search, page size, pagination and full **CRUD** (add/edit/delete through a modal form)
- **Selectable rows** with bulk actions and a selected-count indicator
- **Table without IDs or classes**, for XPath practice, e.g. `//td[text()='Germany']/preceding-sibling::td[1]`
- **Merged cells** using `rowspan` / `colspan`
- **Div-based ARIA grid** that looks like a table but needs role-based locators
</details>

<details open>
<summary><b>🖱️ <a href="https://auto-test-site.vercel.app/interactions.html">Interactions</a></b> (<code>interactions.html</code>)</summary>

- **JavaScript alerts**: `alert`, `confirm`, `prompt`, and an alert that appears after a delay
- **Modals**: small, large and scrollable modals, a modal whose content loads late, and a native `<dialog>`
- **Tabs & accordion**
- **Hover**: tooltips, hover cards, multi-level menus
- **Drag & drop**: HTML5 drag & drop, free drag with mouse events, moving items between lists, a sortable list
- **Mouse actions**: custom context menu, click-and-hold, live mouse position
- **Keyboard**: key-press detection, copy/paste (`Ctrl+A/C/V`), a global `Shift+K` shortcut counter, tab order
- **Scrolling**: scrollable container with a button hidden below the fold, live `scrollTop`, horizontal scroll
- **Custom slider** (not a native range input)
</details>

<details open>
<summary><b>⏳ <a href="https://auto-test-site.vercel.app/dynamic.html">Dynamic & Waits</a></b> (<code>dynamic.html</code>)</summary>

- **Delayed loading**: element hidden in the DOM vs. element rendered after load
- **Enabled / visible after 5 seconds**
- **Dynamic IDs & classes** that change on every page load
- **Stale elements**: a list that re-renders when you click
- **Add / remove elements**, **disappearing elements**, **changing text**, an **animated button**
- **Progress bar** with start/stop
- **Simulated AJAX**: random 1–3 s latency, and **20 % of requests fail** with a 503, so your test needs retries
- **Random notifications**, **random element order**, live clock and counter
- **Infinite scroll**
- **Moving and overlapped elements**, plus an **overlay that blocks clicks** for 3 s
</details>

<details open>
<summary><b>🪟 <a href="https://auto-test-site.vercel.app/frames.html">Frames, Windows & Shadow DOM</a></b> (<code>frames.html</code>)</summary>

- **Iframe with a form** that talks to the parent page through `postMessage`
- **Nested frames** (parent → child) and **side-by-side frames** (LEFT / MIDDLE / RIGHT)
- **Rich-text editor inside a frame**
- **Windows & tabs**: `target="_blank"` link, `window.open` tab, sized popup window, a button that opens 3 tabs at once, and a child window that sends data back to its opener
- **Shadow DOM**: open shadow root with a login form, nested shadow roots, and a **closed** shadow root
</details>

---

## 👥 Test accounts

All built-in accounts use the password **`Password123!`**

| Username | Behaviour |
|----------|-----------|
| `standard_user` | ✅ Everything works as expected |
| `locked_user` | 🔒 Login is rejected: *“Sorry, this user has been locked out.”* |
| `problem_user` | 🐞 Every product shows the same image, sorting silently does nothing, and products with an even ID can't be added to the cart |
| `slow_user` | 🐢 Login and product loading take about 3 seconds |
| `error_user` | 💥 Placing an order always fails (HTTP 500 message); saving the profile fails every other attempt |

You can also **register your own users**. They are stored in `localStorage` and can log in right away.

---

## 🧾 Test data

### 💳 Payment cards
Any future expiry date (`MM/YY`) and any 3-digit CVV.

| Card number | Result |
|-------------|--------|
| `4111 1111 1111 1111` | ✅ Success (Visa) |
| `5555 5555 5555 4444` | ✅ Success (Mastercard) |
| `4000 0000 0000 0002` | ❌ Card declined |
| `4000 0000 0000 9995` | ❌ Insufficient funds |

### 🏷️ Coupons

| Code | Effect |
|------|--------|
| `SAVE10` | 10 % off |
| `QA20` | 20 % off orders of **$100 or more** |
| `FREESHIP` | Free shipping |
| `EXPIRED5` | Always rejected as expired |

### 🚚 Pricing rules

| Rule | Value |
|------|-------|
| Shipping methods | Standard $5.99 (5–7 days) · Express $14.99 (2–3 days) · Overnight $29.99 |
| Free standard shipping | Subtotal ≥ **$75** |
| Tax | **8 %**, applied after the discount |
| Out of stock | *Bluetooth Speaker* (id 5) |
| Low stock | *Summer Dress* (id 10, 3 left) |

These rules make good assertion targets. For example, check that `total = subtotal − discount + shipping + tax`.

---

## 🧪 Example tests

The selectors below exist on the live site. Point `baseURL` at `https://auto-test-site.vercel.app` or your local server.

<details open>
<summary><b>Playwright (TypeScript)</b></summary>

```ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login.html');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('Password123!');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/shop\.html/);
});

test('adds a product to the cart', async ({ page }) => {
  await page.getByTestId('add-to-cart').first().click();
  await expect(page.getByTestId('cart-badge')).toHaveText('1');
});

test('handles a JS confirm dialog', async ({ page }) => {
  await page.goto('/interactions.html');
  page.once('dialog', (d) => d.accept());
  await page.getByTestId('confirm-btn').click();
  await expect(page.getByTestId('alert-result')).toBeVisible();
});
```
</details>

<details>
<summary><b>Cypress</b></summary>

```js
describe('Login', () => {
  it('rejects a locked user', () => {
    cy.visit('/login.html');
    cy.get('[data-testid=username]').type('locked_user');
    cy.get('[data-testid=password]').type('Password123!');
    cy.get('[data-testid=login-button]').click();
    cy.get('[data-testid=login-error]').should('contain', 'locked out');
  });
});
```
</details>

<details>
<summary><b>Selenium (Python)</b></summary>

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://auto-test-site.vercel.app/dynamic.html")

# Explicit wait: the button becomes enabled after 5 seconds
button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='enable-after']"))
)
button.click()
driver.quit()
```
</details>

### 💡 Challenge ideas

- Write a data-driven login test that covers all five personas.
- Complete a checkout with every test card and assert the right message for each.
- Use `problem_user` to write tests that **should fail**, then confirm they catch the bugs.
- Keep the flaky AJAX test green over 50 runs.
- Find the capital of the most populous country in the XPath-only table without using IDs or classes.
- Read the value inside the **closed** shadow root. Can you? Should you be able to?
- Build a Page Object Model for the whole shop flow.

---

## 🚀 Run locally

There is nothing to install. Serve the folder with any static file server:

```bash
git clone https://github.com/madalincmc/auto-test-site.git
cd auto-test-site

npx serve .
# or
python -m http.server 8080
```

Then open <http://localhost:3000> (serve) or <http://localhost:8080> (Python).

> ⚠️ Opening the files directly via `file://` mostly works, but the iframe/window `postMessage` demos need a real HTTP server.

### 🔄 Resetting state between test runs

All data (session, carts, orders, coupons, registered users, profile edits) is stored in `localStorage` under keys prefixed with `qa_`. To start fresh:

- click **Reset all data** in the footer (`data-testid="reset-data"`), or
- clear storage in your test setup:

```js
await page.evaluate(() => localStorage.clear());
```

<details>
<summary><b>localStorage keys</b></summary>

| Key | Contents |
|-----|----------|
| `qa_session` | Logged-in username and login timestamp |
| `qa_registered_users` | Users created via the sign-up form |
| `qa_profiles` | Profile edits, layered over the seed users |
| `qa_last_username` | Username remembered by *Remember me* |
| `qa_cart_<username>` | Cart line items per user |
| `qa_coupon_<username>` | Applied coupon per user |
| `qa_orders_<username>` | Order history per user |

Seeding these keys directly lets you skip the UI, e.g. to log in programmatically for faster tests.
</details>

---

## 🗂️ Project structure

```
auto-test-site/
├── index.html            # Landing page, accounts & test data
├── login.html            # Login / forgot password
├── register.html         # Sign-up form
├── shop.html             # Product listing
├── product.html          # Product detail (?id=N)
├── cart.html             # Cart & coupons
├── checkout.html         # Multi-step checkout
├── orders.html           # Order history
├── profile.html          # User profile & settings
├── elements.html         # Form elements & locator challenges
├── tables.html           # Web tables
├── interactions.html     # Alerts, modals, mouse & keyboard
├── dynamic.html          # Waits, flaky & dynamic content
├── frames.html           # Iframes, windows, shadow DOM
├── 404.html              # Custom not-found page
├── frames/               # Pages loaded inside iframes / new windows
│   ├── frame-form.html
│   ├── frame-parent.html
│   ├── frame-child.html
│   └── new-window.html
├── assets/
│   ├── css/styles.css    # Shared styles
│   └── js/
│       ├── data.js       # Seed data: users, products, coupons, cards, shipping
│       └── common.js     # Storage, auth, cart, orders, header/footer, toasts
└── vercel.json           # Static hosting config (no-cache for HTML)
```

To change products, users, coupons or cards, edit **`assets/js/data.js`**. Everything else reads from it.

---

## ☁️ Deploy your own copy

The site is static, so any host works (GitHub Pages, Netlify, Cloudflare Pages, S3…). For **Vercel**:

**Option A: Git import**
1. Fork this repository.
2. In Vercel, click **Add New → Project** and import your fork.
3. Set the framework preset to **Other**, leave the build command and output directory empty, and click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

**Option C: Vercel Drop.** Drag the folder onto Vercel's browser-based deploy page.

The included `vercel.json` sets `Cache-Control: max-age=0, must-revalidate` on HTML files, so tests always run against the latest version.

---

## 🤝 Contributing

New challenges are welcome. If you have an automation scenario that's hard to practise elsewhere (a tricky widget, a new kind of flakiness, an accessibility pattern), open an issue or a pull request.

1. Fork the repo and create a branch.
2. Add your feature to the matching playground page, or create a new page and link it from `PLAYGROUND` in `assets/js/common.js`.
3. Give interactive elements a `data-testid`, unless the point of the exercise is to have none.
4. Open a PR describing what it lets people practise.

---

<div align="center">

Made with ☕ for QA engineers by [Madalin Cotetiu](https://github.com/madalincmc)

**If this helped you practise, consider giving it a ⭐**

</div>
