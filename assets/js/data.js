/* Seed data for the QA Automation Playground. Everything is client-side. */
window.QA_DATA = {
  // All built-in accounts share the same password.
  users: [
    {
      username: 'standard_user', password: 'Password123!', status: 'active',
      firstName: 'Sam', lastName: 'Tester', email: 'sam.tester@example.com', phone: '+1 555 0100',
      dob: '1992-04-12', gender: 'other', bio: 'Happy path user. Everything works as expected.',
      address: { street: '42 Selector Street', city: 'Springfield', state: 'IL', zip: '62704', country: 'US' }
    },
    {
      username: 'locked_user', password: 'Password123!', status: 'locked',
      firstName: 'Lucy', lastName: 'Locked', email: 'lucy.locked@example.com', phone: '+1 555 0101',
      dob: '1988-11-02', gender: 'female', bio: 'This account has been locked.',
      address: { street: '1 Closed Road', city: 'Denver', state: 'CO', zip: '80202', country: 'US' }
    },
    {
      username: 'problem_user', password: 'Password123!', status: 'active', behavior: 'problem',
      firstName: 'Pat', lastName: 'Problem', email: 'pat.problem@example.com', phone: '+1 555 0102',
      dob: '1995-07-21', gender: 'male', bio: 'Sees a buggy version of the shop. Great for writing failing tests.',
      address: { street: '404 Bug Avenue', city: 'Austin', state: 'TX', zip: '73301', country: 'US' }
    },
    {
      username: 'slow_user', password: 'Password123!', status: 'active', behavior: 'slow',
      firstName: 'Sly', lastName: 'Slowpoke', email: 'sly.slow@example.com', phone: '+1 555 0103',
      dob: '1990-01-30', gender: 'male', bio: 'Login and product loading are artificially delayed.',
      address: { street: '9 Waiting Lane', city: 'Portland', state: 'OR', zip: '97201', country: 'US' }
    },
    {
      username: 'error_user', password: 'Password123!', status: 'active', behavior: 'error',
      firstName: 'Erin', lastName: 'Error', email: 'erin.error@example.com', phone: '+1 555 0104',
      dob: '1993-09-09', gender: 'female', bio: 'Placing an order always fails, and profile saves fail randomly.',
      address: { street: '500 Server Blvd', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' }
    }
  ],

  categories: ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Toys'],

  products: [
    { id: 1, slug: 'wireless-headphones', name: 'Wireless Headphones', category: 'Electronics', price: 79.99, oldPrice: 99.99, rating: 4.5, reviews: 312, stock: 25, emoji: '🎧', color: '#dbe4ff', tag: 'Sale', colors: ['Black', 'White', 'Blue'], description: 'Over-ear Bluetooth headphones with 30h battery life and active noise cancellation.' },
    { id: 2, slug: 'smart-watch', name: 'Smart Watch', category: 'Electronics', price: 149.0, rating: 4.2, reviews: 198, stock: 12, emoji: '⌚', color: '#e5dbff', tag: 'New', colors: ['Black', 'Silver'], description: 'Fitness tracking, heart-rate monitor and notifications on your wrist.' },
    { id: 3, slug: 'mechanical-keyboard', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.5, rating: 4.7, reviews: 540, stock: 40, emoji: '⌨️', color: '#d3f9d8', colors: ['Black', 'White'], description: 'Hot-swappable switches, RGB backlight and aluminium frame.' },
    { id: 4, slug: 'usb-c-charger', name: 'USB-C Fast Charger', category: 'Electronics', price: 24.99, rating: 4.0, reviews: 87, stock: 120, emoji: '🔌', color: '#fff3bf', description: '65W GaN charger that powers laptops, tablets and phones.' },
    { id: 5, slug: 'bluetooth-speaker', name: 'Bluetooth Speaker', category: 'Electronics', price: 59.0, rating: 3.9, reviews: 64, stock: 0, emoji: '🔊', color: '#ffe3e3', colors: ['Red', 'Black'], description: 'Waterproof portable speaker with deep bass. Currently out of stock.' },
    { id: 6, slug: 'classic-t-shirt', name: 'Classic T-Shirt', category: 'Clothing', price: 15.99, rating: 4.3, reviews: 421, stock: 200, emoji: '👕', color: '#e7f5ff', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Navy'], description: '100% organic cotton crew-neck tee.' },
    { id: 7, slug: 'denim-jacket', name: 'Denim Jacket', category: 'Clothing', price: 64.0, oldPrice: 80.0, rating: 4.6, reviews: 133, stock: 18, emoji: '🧥', color: '#d0ebff', tag: 'Sale', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue', 'Black'], description: 'Timeless denim jacket with a relaxed fit.' },
    { id: 8, slug: 'running-shoes', name: 'Running Shoes', category: 'Clothing', price: 110.0, rating: 4.8, reviews: 876, stock: 30, emoji: '👟', color: '#fff4e6', sizes: ['38', '39', '40', '41', '42', '43', '44'], colors: ['White', 'Grey'], description: 'Lightweight cushioned trainers built for long distances.' },
    { id: 9, slug: 'wool-beanie', name: 'Wool Beanie', category: 'Clothing', price: 12.5, rating: 4.1, reviews: 52, stock: 75, emoji: '🧢', color: '#f3f0ff', colors: ['Grey', 'Red', 'Green'], description: 'Soft merino wool beanie for cold days.' },
    { id: 10, slug: 'summer-dress', name: 'Summer Dress', category: 'Clothing', price: 45.0, rating: 4.4, reviews: 91, stock: 3, emoji: '👗', color: '#fff0f6', tag: 'Low stock', sizes: ['XS', 'S', 'M', 'L'], description: 'Breezy floral dress made from linen.' },
    { id: 11, slug: 'coffee-maker', name: 'Coffee Maker', category: 'Home', price: 72.0, rating: 4.3, reviews: 245, stock: 22, emoji: '☕', color: '#f8f0e3', description: 'Programmable 12-cup drip coffee maker with thermal carafe.' },
    { id: 12, slug: 'desk-lamp', name: 'LED Desk Lamp', category: 'Home', price: 34.99, rating: 4.0, reviews: 110, stock: 48, emoji: '💡', color: '#fff9db', colors: ['White', 'Black'], description: 'Dimmable lamp with USB charging port and 5 colour temperatures.' },
    { id: 13, slug: 'house-plant', name: 'Potted House Plant', category: 'Home', price: 19.0, rating: 4.9, reviews: 302, stock: 60, emoji: '🪴', color: '#ebfbee', tag: 'New', description: 'Low-maintenance snake plant in a ceramic pot.' },
    { id: 14, slug: 'scented-candle', name: 'Scented Candle', category: 'Home', price: 9.99, rating: 3.8, reviews: 40, stock: 150, emoji: '🕯️', color: '#fff5f5', description: 'Hand-poured soy candle, 40 hour burn time.' },
    { id: 15, slug: 'testing-handbook', name: 'The Testing Handbook', category: 'Books', price: 29.99, rating: 4.7, reviews: 188, stock: 35, emoji: '📘', color: '#e7f5ff', description: 'A practical guide to software testing techniques and strategy.' },
    { id: 16, slug: 'automation-patterns', name: 'Automation Patterns', category: 'Books', price: 39.99, rating: 4.6, reviews: 97, stock: 20, emoji: '📗', color: '#ebfbee', tag: 'New', description: 'Page objects, screenplay, fixtures and other patterns for robust test suites.' },
    { id: 17, slug: 'mystery-novel', name: 'Mystery Novel', category: 'Books', price: 12.99, rating: 4.1, reviews: 1203, stock: 80, emoji: '📕', color: '#fff5f5', description: 'A page-turning whodunit. Can you find the bug before the detective does?' },
    { id: 18, slug: 'cookbook', name: 'Weeknight Cookbook', category: 'Books', price: 22.0, rating: 4.2, reviews: 64, stock: 14, emoji: '📙', color: '#fff4e6', description: '100 recipes you can cook in under 30 minutes.' },
    { id: 19, slug: 'yoga-mat', name: 'Yoga Mat', category: 'Sports', price: 28.0, rating: 4.5, reviews: 330, stock: 55, emoji: '🧘', color: '#f3f0ff', colors: ['Purple', 'Blue', 'Black'], description: 'Non-slip 6mm mat with carrying strap.' },
    { id: 20, slug: 'basketball', name: 'Basketball', category: 'Sports', price: 25.0, rating: 4.4, reviews: 145, stock: 42, emoji: '🏀', color: '#fff4e6', description: 'Official size 7 indoor/outdoor ball.' },
    { id: 21, slug: 'tennis-racket', name: 'Tennis Racket', category: 'Sports', price: 119.99, oldPrice: 139.99, rating: 4.3, reviews: 58, stock: 9, emoji: '🎾', color: '#f4fce3', tag: 'Sale', description: 'Graphite racket for intermediate players.' },
    { id: 22, slug: 'building-blocks', name: 'Building Blocks Set', category: 'Toys', price: 49.99, rating: 4.8, reviews: 612, stock: 27, emoji: '🧱', color: '#ffe3e3', description: '500-piece creative building set for ages 6+.' },
    { id: 23, slug: 'teddy-bear', name: 'Teddy Bear', category: 'Toys', price: 18.5, rating: 4.9, reviews: 420, stock: 66, emoji: '🧸', color: '#f8f0e3', description: 'Extra soft plush bear, 30cm tall.' },
    { id: 24, slug: 'puzzle-cube', name: 'Puzzle Cube', category: 'Toys', price: 8.99, rating: 4.0, reviews: 230, stock: 300, emoji: '🧩', color: '#e3fafc', description: 'Classic 3x3 speed cube with smooth turning.' }
  ],

  coupons: {
    SAVE10: { type: 'percent', value: 10, label: '10% off your order' },
    QA20: { type: 'percent', value: 20, min: 100, label: '20% off orders over $100' },
    FREESHIP: { type: 'shipping', value: 0, label: 'Free shipping' },
    EXPIRED5: { type: 'expired', label: 'Expired coupon' }
  },

  shippingMethods: [
    { id: 'standard', name: 'Standard (5-7 days)', price: 5.99 },
    { id: 'express', name: 'Express (2-3 days)', price: 14.99 },
    { id: 'overnight', name: 'Overnight', price: 29.99 }
  ],

  countries: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'RO', name: 'Romania' },
    { code: 'IN', name: 'India' },
    { code: 'AU', name: 'Australia' }
  ],

  // Test cards for the checkout payment step.
  cards: {
    '4111111111111111': 'success',
    '5555555555554444': 'success',
    '4000000000000002': 'declined',
    '4000000000009995': 'insufficient_funds'
  },

  TAX_RATE: 0.08,
  FREE_SHIPPING_THRESHOLD: 75
};
