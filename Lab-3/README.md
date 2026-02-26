<div align="center">

<img src="https://img.shields.io/badge/Lab_3-Quality_Engineering-0A0A0A?style=for-the-badge&labelColor=1a1a2e&color=16213e" alt="Lab 3" height="40"/>

<br/>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=250&fit=crop&crop=center" alt="Quality Engineering Lab 3" width="100%"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-Practical_Lab-blue?style=flat-square)
![Academy](https://img.shields.io/badge/Institution-Red_Academy-critical?style=flat-square)

<br/>

**FinLab - a fintech testing playground built for practicing automated testing with Playwright.**
This lab is part of the Quality Engineering program at Red Academy.

[![Live App](https://img.shields.io/badge/Live_App-quality--engineering--labs.vercel.app-000?style=flat-square&logo=vercel)](https://quality-engineering-labs.vercel.app/)

</div>

---

## About

Lab 3 is a fintech web application built specifically for **Quality Engineering** students at **Red Academy** to practice automated testing using [Playwright](https://playwright.dev). The app simulates a financial platform with multiple pages, each designed to expose different UI patterns and API integrations that you would encounter when testing real-world fintech applications.

The app is deployed at **[quality-engineering-labs.vercel.app](https://quality-engineering-labs.vercel.app/)**.

The goal is to give you a controlled environment to practice core Playwright concepts without worrying about breaking anything - go wild.

### What You'll Practice

- **Locators** - finding elements by role, label, placeholder, test ID, and text
- **Assertions** - verifying text content, visibility, element states, attribute values, and more
- **Fixtures** - setting up and tearing down test context, managing browser state
- **Navigation** - page transitions, URL assertions, and multi-page workflows
- **State Management** - `localStorage`, `sessionStorage`, cookies, and authenticated flows
- **API / Async Testing** - handling loading states, network requests, and dynamically rendered content
- **Form Interactions** - filling inputs, selecting options, toggling checkboxes, radio buttons, sliders, and validating payment submissions

---

## App Pages & Features

The app lives in the `app/` directory and consists of five pages:

### Home (`index.html`)

- Hero section with navigation links to all pages
- **Balance widget** - deposit, withdraw, and reset buttons for testing state changes and button interactions
- **Live Exchange Rate fetcher** - calls the [ExchangeRate API](https://www.exchangerate-api.com) to fetch USD/ZAR rates, great for testing loading states and dynamic text

### Transactions (`transactions.html`)

- Fetches and transforms data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com) into financial transactions
- Add transactions with description, amount, and type (income/expense)
- Mark transactions as processed, or delete them
- Filter by **All**, **Income**, or **Expense**
- Displays transaction count and net balance (color-coded)
- Perfect for practicing list rendering assertions, CRUD operations, and filtering logic

### Market Rates (`market.html`)

- Powered by the [ExchangeRate API](https://www.exchangerate-api.com)
- Base currency selector dropdown (USD, EUR, GBP, ZAR, etc.) and rate count input
- Dynamic grid of currency rate cards with loading and error states
- Each card shows currency code, name, rate value, and simulated % change
- Bookmark toggle on each card
- Great for testing `select` elements, dynamic content, async data, and interactive cards

### Payment (`payment.html`)

- A comprehensive payment form with many input types:
  - Recipient name, email, account PIN (with visibility toggle)
  - Transaction type dropdown (Transfer, Payment, Deposit, Withdrawal)
  - Priority radio buttons (Standard, Express, Instant)
  - Category checkboxes (Bills, Savings, Investment, Personal)
  - Amount slider ($0 - $10,000) with live value display
  - Reference/notes textarea with character count
  - Recurring payment toggle, terms checkbox
  - Submit, reset, and disabled buttons
- Client-side validation with error messages
- Displays submitted transaction data as JSON on success
- Ideal for locator practice and form interaction testing

### Login (`login.html`)

- Authentication form with username/password (`admin` / `password123`)
- "Remember me" checkbox
- Error messages on invalid credentials
- On successful login, sets `localStorage`, `sessionStorage`, and cookies
- Redirects to a **Financial Dashboard** showing balance, transactions, accounts, and savings stats
- Navbar updates to show the logged-in user and a logout button
- Perfect for testing auth flows, storage APIs, cookies, and conditional UI

---

## APIs Used

| API | Used On | Purpose |
|:----|:--------|:--------|
| [ExchangeRate API](https://www.exchangerate-api.com) | Home, Market | Live exchange rates and currency data |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com) | Transactions, Login/Dashboard | Transaction seed data, dashboard stats |

---

## Running Locally

The app is deployed at [quality-engineering-labs.vercel.app](https://quality-engineering-labs.vercel.app/), but if you want to run it locally, the app is fully static - no build step or server framework required:

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

<br/><br/>

</div>

---

## Project Structure

```
Lab-3/
├── app/
│   ├── index.html          # Home - balance widget & exchange rate
│   ├── transactions.html   # Transaction list with CRUD & filters
│   ├── market.html         # Market rates with currency selector
│   ├── payment.html        # Payment form with many input types
│   ├── login.html          # Login, auth flow & financial dashboard
│   ├── app.js              # Shared navbar auth logic
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