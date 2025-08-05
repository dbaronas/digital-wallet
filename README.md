# 🎰 Digital Wallet Betting Platform

This is a full-stack project simulating a digital wallet and betting platform, including user registration, login, betting, and wallet tracking functionalities.

Due to limited development time, some functionalities were not implemented or remain partially completed.

CORS options were added in the backend to allow the frontend origin - http://localhost:5173
---

## ✅ Feature Implementation Overview

### Core Requirements

#### 1. User Management

- ✅ Registration (`POST /register`)
- ✅ Login (`POST /login`) with JWT storage

#### 2. Betting Features

- ✅ Place Bets (`POST /bet`) with validation (min €1.00, max = balance)
- ✅ List Bets (`GET /my-bets`)
  - ✅ Pagination
  - ⚠️ Filtering by status and ID not implemented
- ✅ View a single Bet (`/my-bet/:id`) - view it by clicking underlined bet ID within "My Bets" menu section
- ✅ Cancel Bet (`DELETE /my-bet/{id}`) — cancel the bet by clicking the cancel icon (cannot cancel already-canceled bets)

#### 3. Wallet System

- ✅ Display wallet balance
- ✅ Show updated balance across screens
- ✅ List Transactions (`GET /my-transactions`)
  - ✅ Pagination
  - ⚠️ Filtering by type and ID not implemented

#### 4. Technical Requirements

- ⚠️ Responsive Design for smaller devices not implemented
- ✅ Route Protection (private vs. public routes)
- ✅ Euro currency formatting (e.g., €10.50)
- ✅ Form validations (required fields, type checks, API error handling)

---

### 🌟 Bonus Features (Optional)

- ❌ Real-time updates (WebSockets)
- ❌ Dark/Light theme toggle
- ❌ Multi-language support (EN/LT)
- ✅ **UI animations using toast notifications**

---

## 🖥️ Frontend Setup

### Requirements

- Node.js >= 14
- npm

### Setup Instructions

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: http://localhost:5173

---

## 🖥️ Backend Setup

### Requirements

- Node.js >= 14
- npm

### Setup Instructions

```bash
cd backend
npm install
cd mock-api
npm start
```

The app will be available at: http://localhost:3000

---
