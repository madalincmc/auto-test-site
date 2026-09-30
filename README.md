# QA Automation Playground

A static practice website for QA engineers learning UI test automation (Selenium, Playwright, Cypress, WebdriverIO…).
Plain HTML, CSS and JavaScript with no build step and no backend. All state (session, cart, orders, profile edits) is kept in the browser's `localStorage`.

## Pages

| Page | What to practise |
|------|------------------|
| `index.html` | Landing page, test accounts, test data |
| `login.html` | Login validation, locked/slow users, remember me, forgot password, redirect after login |
| `register.html` | Sign-up form validation, password strength, duplicate checks |
| `profile.html` | Edit mode, address, change password, preferences, avatar upload, confirm modal |
| `shop.html` | Search, filters, sorting, pagination, grid/list view, add/remove from cart |
| `product.html?id=N` | Size/colour/quantity selection, tabs, reviews |
| `cart.html` | Quantity updates, remove items, coupons, totals |
| `checkout.html` | Multi-step checkout, card validation, test cards, order confirmation |
| `orders.html` | Order history, expand details, cancel order, filter |
| `elements.html` | Every input type, buttons, checkboxes, radios, native & custom dropdowns, autocomplete, links, images, locator challenges |
| `tables.html` | Static, sortable/searchable/paginated CRUD table, bulk selection, XPath-only table, merged cells, ARIA grid |
| `interactions.html` | JS alerts, modals, native dialog, tabs, accordion, hover, drag & drop, context menu, click-and-hold, keyboard, scrolling, custom slider |
| `dynamic.html` | Delayed elements, enable/visible after N seconds, dynamic IDs, stale elements, progress bar, flaky AJAX, infinite scroll, overlays |
| `frames.html` | Iframes, nested frames, editor in a frame, new tabs/windows, open/nested/closed shadow DOM |

## Test accounts

Password for all: `Password123!`

| Username | Behaviour |
|----------|-----------|
| `standard_user` | Works normally |
| `locked_user` | Login rejected (locked out) |
| `problem_user` | Same image for all products, sorting broken, even-ID products can't be added to cart |
| `slow_user` | Login and product list take ~3 s |
| `error_user` | Placing an order fails; saving the profile fails every other attempt |

**Cards:** `4111 1111 1111 1111` success · `4000 0000 0000 0002` declined · `4000 0000 0000 9995` insufficient funds (any future expiry, any CVV)
**Coupons:** `SAVE10`, `QA20` (orders ≥ $100), `FREESHIP`, `EXPIRED5` (always expired)

Use the **Reset all data** button in the footer, or clear `localStorage`, to start fresh between test runs.

## Run locally

Any static file server works:

```bash
npx serve .
# or
python -m http.server 8080
```

Opening the files directly with `file://` mostly works, but the frame/window `postMessage` demos need a real server.

## Deploy to Vercel

No configuration is needed beyond the included `vercel.json`.

**Option A: Git**
1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, click **Add New → Project**, import the repo.
3. Framework preset: **Other**. Leave the build command and output directory empty. Click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

**Option C: Vercel Drop:** drag this folder into the browser-based deploy page at vercel.com.
