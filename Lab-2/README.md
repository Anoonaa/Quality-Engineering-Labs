<div align="center">

<img src="https://img.shields.io/badge/Lab_2-Buggy_Bank_Fintech_API-0A0A0A?style=for-the-badge&labelColor=1a1a2e&color=16213e" alt="Lab 2" height="40"/>

<br/>

<img src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=900&h=250&fit=crop&crop=center" alt="Fintech API Testing" width="100%"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-End--to--End_Challenge-blue?style=flat-square)
![Academy](https://img.shields.io/badge/Institution-Red_Academy-critical?style=flat-square)
![Node](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)

<br/>

**An end-to-end QA testing challenge built around the Buggy Bank Fintech API.**
Students will use Swagger, Postman, SQL Server, and the API itself to verify, test, and uncover intentional data integrity flaws.

</div>

---

## Table of Contents

| Section | Description |
|:--------|:------------|
| [About](#about) | What this lab is and what you will do |
| [Tech Stack](#tech-stack) | Tools and technologies used |
| [Project Structure](#project-structure) | Repository layout for this lab |
| [Getting Started](#getting-started) | Setup and run instructions |
| [API & Swagger Docs](#api--swagger-docs) | Endpoint details and interactive documentation |
| [Deployment](#deployment) | Render deployment details |

---

## About

The **Buggy Bank Fintech API** is a sandbox API deliberately designed with data integrity flaws. This lab challenges students to perform **end-to-end quality engineering** — from reading API documentation, to executing requests, to querying the database and validating that the system behaves (or misbehaves) as expected.

### What You Will Do

- 📖 Explore the API using **Swagger UI** interactive documentation
- 🧪 Build and execute test collections in **Postman**
- 🗄️ Query **SQL Server** to verify data integrity after API operations
- 🐛 Identify and document intentional bugs and data flaws in the system

---

## Tech Stack

<div align="center">

<br/>

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

<br/><br/>

</div>

---

## Project Structure

```
Lab-2/
│
├── server.js          # Express API server with Swagger docs
├── package.json       # Node.js dependencies and scripts
├── .gitignore         # Ignored files (node_modules, .env)
└── README.md          # This file
```

---

## Getting Started

**Prerequisites**

- [Node.js](https://nodejs.org/) installed
- Access to a **SQL Server** instance with the required database and stored procedures
- A `.env` file configured with your database credentials

**Install Dependencies**

```bash
cd Lab-2
npm install
```

**Environment Variables**

Create a `.env` file in the `Lab-2` directory:

```env
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_NAME=your_db_name
DB_PORT=1433
```

**Run the Server**

```bash
node server.js
```

On successful start you will see:

```
✅ API: http://localhost:3000
📖 Swagger UI: http://localhost:3000/api-docs
```

---

## API & Swagger Docs

Once the server is running, open **Swagger UI** in your browser to explore and test the API interactively:

```
http://localhost:3000/api-docs
```

### Endpoints

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `POST` | `/api/transfer` | Perform a fund transfer between two wallets |

> ⚠️ **Note:** This API intentionally contains data integrity flaws. Part of the challenge is to discover them through testing.

---

## Deployment

This lab is configured for deployment on **[Render](https://render.com/)**. The server can be deployed as a Web Service pointing to the `Lab-2` directory with `node server.js` as the start command.

---

<div align="center">

<img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&h=200&fit=crop&crop=center" alt="Code Quality" width="100%"/>

<br/>

<sub>Lab 2 — Buggy Bank Fintech API · Quality Engineering Labs · Red Academy</sub>

<br/>

</div>