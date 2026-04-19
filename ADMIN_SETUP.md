# Ultratech Cement Admin System - Setup Guide

## Overview
This is a complete order management and admin panel system for the Ultratech Cement ecommerce website. It includes:

- **Order System**: Users can place orders directly from the website
- **Admin Dashboard**: Real-time order management, product editing, and analytics
- **Authentication**: Email/password-based admin login
- **Analytics**: Order statistics, revenue tracking, and status distribution

## Features Implemented

### 1. User-Facing Features (HomePage)
- ✅ Shopping cart with product management
- ✅ Order placement form
- ✅ Real-time order saving to Firestore
- ✅ Order confirmation feedback
- ✅ Admin login link in navigation

### 2. Admin Features (/admin)
- ✅ **Orders Management**
  - Real-time order list with live updates
  - Filter by status (pending, processing, delivered)
  - Update order status with one click
  - WhatsApp notification integration
  - Order details display

- ✅ **Products Management**
  - Edit product prices
  - Update stock levels
  - Modify descriptions
  - Real-time product list

- ✅ **Analytics Dashboard**
  - Total orders count
  - Total revenue
  - Average order value
  - Order status distribution (pie chart)
  - Daily revenue tracking (line chart)
  - Delivery, processing, and pending rates

### 3. Security
- ✅ Firebase Authentication
- ✅ Protected routes (only logged-in users access /admin)
- ✅ Automatic redirect to login for unauthorized access
- ✅ Session-based authentication

## Firebase Setup

### 1. Create a Firebase Project

Go to [Firebase Console](https://console.firebase.google.com) and:

1. Click "Create a new project"
2. Name it "ultratech-cement-admin"
3. Enter your preferences and create

### 2. Get Your Firebase Config

1. Go to Project Settings
2. Copy your Firebase config object
3. Paste it into `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable "Email/Password"
3. Click Create user:
   - Email: `admin@ultratech.com`
   - Password: `Admin@123`

### 4. Create Firestore Collections

1. Go to Firestore Database
2. Create new database (Start in production mode)
3. Create these collections:

#### Collection: `orders`
**Documents**: Auto-generated. Each order will have:
```json
{
  "name": "Customer Name",
  "phone": "+91 98765 43210",
  "email": "customer@email.com",
  "location": "Madurai",
  "items": [
    {
      "id": "opc53",
      "name": "OPC 53 Grade",
      "quantity": 5,
      "price": 425
    }
  ],
  "total": 2125,
  "status": "pending",
  "createdAt": "timestamp"
}
```

#### Collection: `products`
**Documents**: Create 3 documents with IDs:

**Document ID: `opc53`**
```json
{
  "id": "opc53",
  "name": "OPC 53 Grade",
  "grade": "53",
  "price": 425,
  "stock": 1000,
  "description": "High strength concrete, columns, slabs",
  "image": "/product_opc53.jpg"
}
```

**Document ID: `opc43`**
```json
{
  "id": "opc43",
  "name": "OPC 43 Grade",
  "grade": "43",
  "price": 395,
  "stock": 1200,
  "description": "General construction, plaster, masonry",
  "image": "/product_opc43.jpg"
}
```

**Document ID: `ppc`**
```json
{
  "id": "ppc",
  "name": "PPC Cement",
  "grade": "PPC",
  "price": 380,
  "stock": 800,
  "description": "Eco-friendly, durable, sulfate-resistant",
  "image": "/product_ppc.jpg"
}
```

### 5. Set Firestore Rules

Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and create orders
    match /orders/{document=**} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated admins to manage products
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Running the Application

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Access Points

- **Home**: `http://localhost:5173/`
- **Admin Login**: `http://localhost:5173/login`
- **Admin Dashboard**: `http://localhost:5173/admin`

### Demo Credentials
- Email: `admin@ultratech.com`
- Password: `Admin@123`

## Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx          # Route protection component
│   └── admin/
│       ├── OrdersManagement.tsx    # Orders table & management
│       ├── ProductsManagement.tsx  # Product editing
│       └── Analytics.tsx            # Dashboard charts
├── contexts/
│   └── AuthContext.tsx              # Auth state management
├── pages/
│   ├── HomePage.tsx                 # Main website
│   ├── LoginPage.tsx               # Admin login
│   └── AdminDashboard.tsx          # Admin panel
├── services/
│   └── firebase.ts                  # Firebase config
├── App.tsx                          # Main routing
└── main.tsx                         # Entry point
```

## Key Files Modified

1. **App.tsx** - Converted to routing root
2. **HomePage.tsx** - New page with order system
3. **Created auth context, services, and pages as documented above**

## Usage Guide

### For Customer

1. Visit the website homepage
2. Browse products
3. Click "Add to Cart"
4. Click shopping cart icon
5. Review items and total
6. Click "Proceed to Checkout"
7. Fill in details (name, phone, location)
8. Click "Place Order"
9. Order is recorded in Firestore ✅

### For Admin

1. Go to `/login`
2. Enter credentials (admin@ultratech.com / Admin@123)
3. Access admin dashboard at `/admin`

#### Managing Orders
- **View Orders**: See all orders in real-time
- **Filter**: Use status filters (Pending, Processing, Delivered)
- **Update Status**: Click status buttons to change order status
- **WhatsApp**: Send order updates via WhatsApp link

#### Managing Products
- **Edit**: Click edit icon on any product
- **Update**: Change price, stock, or description
- **Save**: Click "Save Changes"

#### Analytics
- View total orders and revenue
- See status distribution chart
- Track daily revenue
- Monitor delivery, processing, and pending rates

## Important Notes

1. **Firebase Credentials**: Never commit firebase.ts with real credentials to GitHub
2. **Firestore Rules**: Make sure rules are configured for your use case
3. **Products**: Must be created manually in Firestore first
4. **Admin Account**: Create at least one admin user in Firebase Auth
5. **WhatsApp Integration**: Uses WhatsApp business link (require +91 prefix for Indian numbers)

## Customization

### Change Admin Credentials
1. Go to Firebase Authentication
2. Delete old user
3. Create new user with desired email/password
4. Update demo info in LoginPage.tsx

### Modify Product List
Edit the products array in `src/pages/HomePage.tsx`

### Update Colors/Branding
All colors use Tailwind classes with hex values:
- Dark: `#0B0C0F`
- Orange accent: `#FF4D2E`
- Light: `#F6F7F9`

### Add More Product Fields
Update the Product interface and Firestore documents accordingly

## Troubleshooting

### Orders Not Appearing
1. Check Firestore rules allow read access for authenticated users
2. Verify Firebase config is correct
3. Check browser console for errors

### Admin Page Blank
1. Verify you're logged in
2. Check ProtectedRoute component
3. Confirm Firebase auth is initialized

### Can't Place Orders
1. Verify Firestore is initialized
2. Check network tab for API errors
3. Ensure products are added to Firestore

### Images Not Loading
Add image placeholders to `/public` folder:
- `product_opc53.jpg`
- `product_opc43.jpg`
- `product_ppc.jpg`
- `hero_cement_bag.png`
- `why_dealer.jpg`
- `delivery_truck.jpg`
- `testimonial_portrait.jpg`
- `quality_plant.jpg`
- `madurai_map.jpg`

## Performance Optimization

- Real-time updates use Firestore onSnapshot (efficient)
- Products cached at component level
- Authentication state cached in context
- No unnecessary re-renders

## Next Steps

1. Add payment integration (Razorpay/Stripe)
2. Add email notifications
3. Implement SMS updates
4. Add inventory management
5. Create order PDF export
6. Add customer support chat
7. Implement discount codes
8. Add multiple admin roles

## Support

For issues or questions, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
