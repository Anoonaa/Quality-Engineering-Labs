<div align="center">

<img src="https://img.shields.io/badge/Lab_3-Quality_Engineering-0A0A0A?style=for-the-badge&labelColor=1a1a2e&color=16213e" alt="Lab 3" height="40"/>

<br/>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=250&fit=crop&crop=center" alt="Quality Engineering Lab 3" width="100%"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-Practical_Lab-blue?style=flat-square)
![Academy](https://img.shields.io/badge/Institution-Red_Academy-critical?style=flat-square)

<br/>

**Playwright Testing Playground - a purpose-built web app for practicing automated testing with Playwright.**
This lab is part of the Quality Engineering program at Red Academy.

[![Live App](https://img.shields.io/badge/Live_App-quality--engineering--labs.vercel.app-000?style=flat-square&logo=vercel)](https://quality-engineering-labs.vercel.app/)

</div>

---

## About

Lab 3 is a static web application built specifically for **Quality Engineering** students at **Red Academy** to practice automated testing using [Playwright](https://playwright.dev). The app is made up of multiple pages, each designed to expose different UI patterns and API integrations that you would encounter in real-world testing scenarios.

The app is deployed at **[quality-engineering-labs.vercel.app](https://quality-engineering-labs.vercel.app/)**.

The goal is to give you a controlled environment to practice core Playwright concepts without worrying about breaking anything - go wild.

### What You'll Practice

- **Locators** - finding elements by role, label, placeholder, test ID, and text
- **Assertions** - verifying text content, visibility, element states, attribute values, and more
- **Fixtures** - setting up and tearing down test context, managing browser state
- **Navigation** - page transitions, URL assertions, and multi-page workflows
- **State Management** - `localStorage`, `sessionStorage`, cookies, and authenticated flows
- **API / Async Testing** - handling loading states, network requests, and dynamically rendered content
- **Form Interactions** - filling inputs, selecting options, toggling checkboxes, radio buttons, sliders, and validating submissions

---

## App Pages & Features

The app lives in the `app/` directory and consists of five pages:

### Home (`index.html`)

- Hero section with navigation links
- **Counter widget** - increment, decrement, and reset buttons for testing state changes and button interactions
- **Random Joke fetcher** - calls the [Chuck Norris API](https://api.chucknorris.io) to load async content, great for testing loading states and dynamic text

### Todo List (`todos.html`)

- Fetches todos from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- Add, complete, and delete todos
- Filter by **All**, **Active**, or **Completed**
- Displays item counts and empty states
- Perfect for practicing list rendering assertions, CRUD operations, and filtering logic

### Dog Gallery (`dogs.html`)

- Powered by the [Dog CEO API](https://dog.ceo/dog-api/)
- Breed selector dropdown and image count input
- Dynamic image grid with loading and error states
- Favorite toggle on each card
- Great for testing `select` elements, dynamic images, async content, and interactive cards

### Form Playground (`form.html`)

- A comprehensive form with many input types:
  - Text, email, password (with visibility toggle)
  - Dropdown select, radio buttons, checkboxes
  - Range slider with live value display
  - Textarea with character count
  - Toggle switch, terms checkbox
  - Submit, reset, and disabled buttons
- Client-side validation with error messages
- Displays submitted data as JSON on success
- Ideal for locator practice and form interaction testing

### Login (`login.html`)

- Authentication form with username/password (`admin` / `password123`)
- "Remember me" checkbox
- Error messages on invalid credentials
- On successful login, sets `localStorage`, `sessionStorage`, and cookies
- Redirects to a **Dashboard** showing session info and stats fetched from JSONPlaceholder
- Navbar updates to show the logged-in user and a logout button
- Perfect for testing auth flows, storage APIs, cookies, and conditional UI

---

## APIs Used

| API | Used On | Purpose |
|:----|:--------|:--------|
| [Chuck Norris API](https://api.chucknorris.io) | Home | Random joke fetching |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com) | Todos, Login/Dashboard | Todos list, dashboard stats |
| [Dog CEO API](https://dog.ceo/dog-api/) | Dogs | Breed list and random dog images |

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
│   ├── index.html        # Home - counter & joke fetcher
│   ├── todos.html         # Todo list with CRUD & filters
│   ├── dogs.html          # Dog gallery with breed selector
│   ├── form.html          # Form playground with many input types
│   ├── login.html         # Login, auth flow & dashboard
│   ├── app.js             # Shared navbar auth logic
│   └── style.css          # Global styles
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