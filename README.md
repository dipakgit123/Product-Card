# InnerWear Store - Product Listing Page

A responsive e-commerce product listing page for clothing innerwear built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

### Core Features
- Display of 12+ innerwear products
- Add to Cart functionality with persistent cart (localStorage)
- Cart count badge in navigation
- Sort products by price (Low to High / High to Low) and newest
- Filter products by category (Men, Women, Kids, Unisex)
- Fully responsive design for mobile and desktop

### Bonus Features
- Search functionality (search by product name or description)
- Clean, modern UI with smooth animations
- Cart page with detailed order summary
- GST calculation (18% - split as CGST 9% + SGST 9%)
- Toast notifications for user actions
- Size selection for products

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **State Management:** React Context API
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Icons:** React Icons (Feather Icons)
- **Notifications:** React Hot Toast

## Project Structure

```
Product Card/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── Loading.jsx
│   │   ├── context/        # React Context for state
│   │   │   └── CartContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   └── CartPage.jsx
│   │   ├── services/       # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── Product.js     # Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js
│   ├── index.js           # Express server
│   ├── seed.js            # Database seeder
│   ├── .env
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR MongoDB Atlas account (for cloud deployment)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Product Card"
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB connection string
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/product-store

# For MongoDB Atlas (cloud):
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/product-store

# Seed the database with sample products
npm run seed

# Start the server (development mode)
npm run dev

# OR for production
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

## MongoDB Deployment Question

**Q: Do we need MongoDB cluster for deployment?**

**A:** It depends on your deployment strategy:

1. **For Local Development:** You can use MongoDB installed locally on your machine.

2. **For Production Deployment:** Yes, you'll need either:
   - **MongoDB Atlas (Recommended):** Free tier available with 512MB storage. Perfect for small to medium applications.
   - **Self-hosted MongoDB:** On your own server or VPS.

**MongoDB Atlas Setup:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 free tier is sufficient)
3. Set up database user and password
4. Whitelist your IP address (or allow access from anywhere for development)
5. Get the connection string and update your `.env` file

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with optional filters) |
| GET | `/api/products/:id` | Get single product by ID |
| GET | `/api/products/categories` | Get all categories |

### Query Parameters for `/api/products`
- `category` - Filter by category (Men, Women, Kids, Unisex)
- `sort` - Sort option (price-asc, price-desc, newest)
- `search` - Search in name and description

## Short Questions Answers

### 1. Why did you choose this tech stack?

I chose this tech stack for several reasons:

- **React:** Industry-standard library with excellent component reusability, large ecosystem, and efficient rendering through Virtual DOM. Perfect for building interactive UIs.

- **Tailwind CSS:** Utility-first CSS framework that enables rapid UI development with consistent styling. Reduces CSS bundle size in production through purging unused styles.

- **Vite:** Modern build tool that offers significantly faster development experience compared to Create React App, with instant HMR (Hot Module Replacement).

- **Node.js + Express:** JavaScript on both frontend and backend enables code sharing and reduces context switching. Express is lightweight, flexible, and has excellent middleware support.

- **MongoDB:** NoSQL database perfect for e-commerce with flexible schema for products. Pairs excellently with Node.js through Mongoose ODM.

### 2. How would you improve this project?

Several enhancements could be made:

- **Authentication:** Add user registration/login with JWT tokens
- **Product Details Page:** Dedicated page with more product information, reviews
- **Wishlist Feature:** Allow users to save products for later
- **Payment Integration:** Add Razorpay or Stripe for actual payments
- **Admin Dashboard:** CRUD operations for products, order management
- **Order History:** Track user orders and delivery status
- **Product Reviews:** User ratings and reviews system
- **Image Optimization:** Use lazy loading and CDN for images
- **Testing:** Add unit tests (Jest) and E2E tests (Cypress)
- **PWA Support:** Make the app installable and work offline
- **Performance:** Add pagination/infinite scroll for large product catalogs

### 3. How do you handle debugging?

My debugging approach involves multiple techniques:

1. **Browser DevTools:** Chrome DevTools for inspecting elements, network requests, console logs, and React DevTools for component state

2. **Console Logging:** Strategic `console.log()` statements to trace data flow

3. **React DevTools:** Inspect component hierarchy, props, and state changes

4. **Network Tab:** Monitor API requests/responses for backend issues

5. **Error Boundaries:** Implement React error boundaries to catch and display errors gracefully

6. **VS Code Debugger:** Set breakpoints for step-by-step execution

7. **MongoDB Compass:** Visual tool to inspect database collections and queries

8. **Postman/Thunder Client:** Test API endpoints independently

9. **Systematic Approach:**
   - Reproduce the bug consistently
   - Isolate the problem area
   - Check recent changes
   - Read error messages carefully
   - Use binary search (comment out code) to narrow down

## License

MIT License - Feel free to use this project for learning and development.
