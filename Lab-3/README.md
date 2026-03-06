<div align="center">

<img src="https://img.shields.io/badge/Lab_3-Quality_Engineering-0A0A0A?style=for-the-badge&labelColor=1a1a2e&color=16213e" alt="Lab 3" height="40"/>

<br/>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=250&fit=crop&crop=center" alt="Quality Engineering Lab 3" width="100%"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-Practical_Lab-blue?style=flat-square)
![Academy](https://img.shields.io/badge/Institution-Red_Academy-critical?style=flat-square)

<br/>

**MerchantHub — a digital merchant payment platform built for practicing automated testing with Playwright.**
This lab is part of the Quality Engineering program at Red Academy.

[![Live App](https://img.shields.io/badge/Live_App-quality--engineering--labs.vercel.app-000?style=flat-square&logo=vercel)](https://quality-engineering-labs.vercel.app/)

</div>

---

## About

Lab 3 is a merchant payment platform called **MerchantHub**, built specifically for **Quality Engineering** students at **Red Academy** to practice automated testing using [Playwright](https://playwright.dev). The app simulates a digital merchant ecosystem — selling airtime, data bundles, vouchers, electricity tokens, and more — with ten pages, each designed to expose different UI patterns you would encounter when testing real-world fintech applications.

The app is deployed at **[quality-engineering-labs.vercel.app](https://quality-engineering-labs.vercel.app/)**.

All data is stored in the browser via `localStorage` using a shared data layer (`db.js` / `FlashDB`), so there are no external API dependencies. The goal is to give you a controlled, self-contained environment to practice core Playwright concepts without worrying about breaking anything — go wild.

### What You'll Practice

- **Locators** — finding elements by role, label, placeholder, test ID, and text
- **Assertions** — verifying text content, visibility, element states, attribute values, and more
- **Fixtures** — setting up and tearing down test context, managing browser state
- **Navigation** — page transitions, URL assertions, and multi-page workflows
- **State Management** — `localStorage`, `sessionStorage`, cookies, and authenticated flows
- **Form Interactions** — filling inputs, selecting dropdowns, toggling checkboxes, radio buttons, and validating submissions
- **CRUD Operations** — adding, editing, deleting, and filtering transactions, customers, and cart items
- **Dynamic Content** — product catalogs rendered from data, stats that update on interaction, and conditional UI
- **Modals & Dialogs** — customer detail modals, receipt detail modals, checkout confirmations, and toast notifications
- **Charts & Visualisations** — Chart.js-powered analytics and wallet charts for asserting canvas-rendered content

---

## App Pages & Features

The app lives in the `app/` directory and consists of ten pages:

### Home (`index.html`)

- Hero section with navigation links to key pages
- **Partners section** — trusted provider logos (Vodacom, MTN, Telkom, PlayStation, Steam, Showmax)
- **About section** — product count, transaction count, and category count stats pulled from FlashDB
- Code preview block showcasing a Playwright test example
- Great for testing hero content, dynamic stats, and page layout assertions

### Products (`market.html`)

- Product catalog powered by FlashDB with 35+ digital products across six categories: Airtime, Data Bundles, 1Voucher, Electricity, Gaming Vouchers, and Entertainment
- **Category filter** dropdown and **provider search** input
- **Add to cart** functionality with quantity controls
- **Cart drawer** with line items, totals, and checkout button
- Wallet balance bar showing available funds and cart summary
- Checkout deducts from wallet, decrements stock, generates voucher PINs, creates receipts and transactions
- Ideal for testing `select` elements, dynamic grids, cart state, and multi-step checkout flows

### Sell (`payment.html`)

- Point-of-sale form for processing over-the-counter digital product sales
- Customer phone number input with validation
- **Product type** dropdown (Airtime, Data, 1Voucher, Electricity, Gaming, Entertainment) with dynamic sub-options for provider and amount
- Optional fields: meter number (electricity), account number, reference
- Generates a **sale receipt** with voucher PINs or electricity tokens
- Earns **5% commission** credited to the merchant wallet
- Links customer purchases to customer records automatically
- Perfect for testing form validation, conditional form fields, and receipt generation

### Transactions (`transactions.html`)

- Merchant transaction ledger — all sales from checkout and sell pages appear automatically
- **Stats banner** showing total sales, stock purchases, net P&L, and transaction count
- Add manual transactions with description, amount, and type (sale/stock-purchase)
- Mark transactions as processed, or delete them
- **Filter** by All, Sales, or Stock Purchases
- **Search** by description or reference
- Export transactions as CSV
- Great for practicing list rendering assertions, CRUD operations, filtering, and data export

### Customers (`customers.html`)

- Customer directory with 10 seed customers from FlashDB
- **Stats row** — total customers, total spend, top spender, and average transactions
- **Search** by name, phone, or email and **sort** by name, spend, recency, or transaction count
- **Add/edit customer** form with name, phone, email, and notes fields (with validation)
- **Customer cards** with avatar, tier badge (Gold/Silver/Bronze based on spend), contact info, and stats
- **Detail modal** showing full customer profile with spending breakdown
- Delete customers with confirmation dialog
- Ideal for testing search/filter interactions, form CRUD, modals, and tier logic

### Analytics (`analytics.html`)

- Business analytics dashboard with Chart.js visualisations
- **KPI cards** — total revenue, total orders, average order value, and customer count with trend indicators
- **Charts** — revenue over time, sales by category (doughnut), top products (bar), and more
- Data sourced from FlashDB transactions, receipts, and customers
- Perfect for testing chart rendering, KPI assertions, and data-driven UI

### Wallet (`wallet.html`)

- Merchant wallet management page
- **Big balance card** showing available funds
- **Top Up**, **Transfer**, and **Withdraw** actions with form modals
- **Wallet history chart** (Chart.js) showing balance over time
- Balance updates reflect across the entire platform (Products, Sell, Transactions)
- Great for testing modal forms, balance calculations, and cross-page state consistency

### Receipts (`receipts.html`)

- Receipt history generated from checkout and sell operations
- **Stats row** — total receipts, total value, items sold, and average receipt value
- **Search** by reference, product name, or phone and **sort** by date or value
- Receipt cards with reference, date, item summary, total, and commission
- **Detail modal** showing full receipt with line items, voucher PINs/electricity tokens, wallet before/after, and commission
- **Print** receipt and **Export CSV** buttons
- Ideal for testing receipt generation, search/sort, modal content, and export functionality

### Settings (`settings.html`)

- Merchant settings with a **tabbed interface** (Profile, Notifications, Security, Display, Data)
- **Profile tab** — store name, owner name, email, phone, address, currency, commission rate, tax rate
- **Notifications tab** — email, SMS, and push notification toggles
- **Security tab** — password change form
- **Display tab** — theme and appearance preferences
- **Data tab** — reset all data, import/export settings
- All settings persist in localStorage via FlashDB
- Perfect for testing tab navigation, form inputs, toggle switches, and settings persistence

### Account / Login (`login.html`)

- Authentication form with username/password (`admin` / `password123`)
- "Remember me" checkbox
- Error messages on invalid credentials
- On successful login, sets `localStorage`, `sessionStorage`, and cookies
- Redirects to a **Merchant Dashboard** showing wallet balance, sales transactions, product count, customer count, recent transactions, and quick-action links
- Navbar updates to show the logged-in merchant name and a logout button
- Perfect for testing auth flows, storage APIs, cookies, and conditional UI

---

## Data Layer

MerchantHub uses a client-side data layer called **FlashDB** (`db.js`) backed by `localStorage`. There are no external API calls — all product catalogs, customers, transactions, receipts, wallet state, and settings are stored and managed entirely in the browser.

| Data Store | Key | Description |
|:-----------|:----|:------------|
| Wallet | `mhub_wallet` | Merchant balance (starts at R5,000) |
| Products | `mhub_products` | 35+ digital products across 6 categories |
| Cart | `mhub_cart` | Shopping cart for the Products page |
| Transactions | `mhub_transactions` | Sales and stock purchase records |
| Receipts | `mhub_receipts` | Generated from checkout and sell operations |
| Customers | `mhub_customers` | 10 seed customers with spend history |
| Settings | `mhub_settings` | Merchant profile and preferences |

---

## Running Locally

The app is deployed at [quality-engineering-labs.vercel.app](https://quality-engineering-labs.vercel.app/), but if you want to run it locally, the app is fully static — no build step or server framework required:

```bash
cd Lab-3
npx serve app
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tools and Technologies

<div align="center">

<br/>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge)

<br/><br/>

</div>

---

## Project Structure

```
Lab-3/
├── app/
│   ├── index.html          # Home — hero, partners, about stats
│   ├── market.html         # Products — catalog, cart & checkout
│   ├── payment.html        # Sell — point-of-sale form & receipts
│   ├── transactions.html   # Transactions — ledger with CRUD & export
│   ├── customers.html      # Customers — directory with tiers & modals
│   ├── analytics.html      # Analytics — Chart.js dashboards & KPIs
│   ├── wallet.html         # Wallet — balance, top-up, transfers & chart
│   ├── receipts.html       # Receipts — history, detail modals & export
│   ├── settings.html       # Settings — tabbed merchant preferences
│   ├── login.html          # Account — login, auth & merchant dashboard
│   ├── db.js               # FlashDB — localStorage data layer
│   ├── app.js              # Shared navbar, auth, dark mode & toasts
│   └── style.css           # Global styles
├── package.json
└── README.md
```

---

<div align="center">

<img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&h=200&fit=crop&crop=center" alt="Code Quality" width="100%"/>

<br/>

<sub>Lab 3 · Quality Engineering Labs · Red Academy</sub>

<br/>

</div>