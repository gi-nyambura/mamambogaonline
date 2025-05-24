# 🌾 Mama Mboga – Agritech Market Match Platform

**Mama Mboga** is a Firebase-powered, location-aware, multi-vendor grocery and produce marketplace that connects small-scale farmers directly with nearby buyers, eliminating middlemen and boosting access to fresh produce. Designed for Kenya’s agricultural market, it provides real-time market insights, buyer demand data, and voice-enabled search in Swahili.

---

## 🔗 Live Demo
> _[Add your hosted link here if deployed using Firebase Hosting]_

---

## 🚀 Tech Stack

- **Frontend**: React.js (Responsive PWA)
- **Backend/Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Phone)
- **Hosting**: Firebase Hosting
- **Cloud Functions**: Firebase Functions (Serverless Logic)
- **Storage**: Firebase Storage (Product Images)
- **AI/ML**: Firebase GenKit / Firebase ML (Voice search, price trends)
- **Payments**: M-Pesa (via Daraja API), Flutterwave

---

## 👤 User Roles

### 🛍️ Buyer
- Browse products based on **current location**
- See **"For You" page** with local offers, freshness filters
- View **price trends** and discounts (e.g., Tomatoes ↓12%)
- Add to cart and checkout with M-Pesa or Flutterwave
- Track orders via **Farm-to-You visual timeline**
- Use **Swahili voice search** (e.g., “Tafuta nyanya”)

### 🌽 Seller (Farmer or Vendor)
- Manage produce listings with photo, pricing, freshness, and fertilizer info
- View **real-time pricing trends** (↑/↓ percentage)
- Track **customer demand and product performance**
- Manage current stock and receive order requests
- Get basic sales analytics

### 🛡️ Admin (You)
- Access **admin-only dashboard** via Firebase Auth
- View and manage all users, products, orders
- Moderate sellers and approve Eco Badges (e.g., “Organic”)
- Update or approve local market price data
- Push alerts to buyers and sellers
- Access full analytics and platform controls

---

## 📁 Firestore Structure

```plaintext
users/
  uid/
    name, role, location, phone

products/
  pid/
    sellerId, name, price, stock, photoUrl, freshness, fertilizerUsed, organicFlag

orders/
  orderId/
    buyerId, sellerId, items[], status, timestamps

market_prices/
  county/
    product, price, price_change_percent

search_trends/
  product, count, location

notifications/
  userId, message, timestamp
