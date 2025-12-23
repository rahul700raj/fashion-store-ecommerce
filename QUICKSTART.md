# ⚡ Quick Start Guide

## 🎯 Try it NOW (No Installation)

**Live Demo on StackBlitz:**
👉 [https://stackblitz.com/github/rahul700raj/fashion-store-ecommerce](https://stackblitz.com/github/rahul700raj/fashion-store-ecommerce)

Click the link above to see your store running instantly in the browser!

## 💻 Run Locally (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/rahul700raj/fashion-store-ecommerce.git

# 2. Navigate to folder
cd fashion-store-ecommerce

# 3. Install dependencies
npm install

# 4. Start the app
npm start
```

**That's it!** Your store opens at `http://localhost:3000` 🎉

## 🎮 How to Use

### 1️⃣ Sign Up
- Click "Sign Up" button
- Enter your details (email: rm2778643@gmail.com is pre-filled)
- Get **100 coins** instantly! 🪙

### 2️⃣ Browse Products
- Click "Products" in navigation
- See shirts and jeans collection
- Each product shows price in ₹

### 3️⃣ Add to Cart
- Click "Add to Cart" on any product
- Earn **5 coins** per item added! 🪙
- See cart count update in header

### 4️⃣ Checkout
- Click "Cart" to review items
- Adjust quantities with +/- buttons
- Click "Checkout"
- Fill delivery information
- Place order

### 5️⃣ Track Orders
- Click "Orders" to see all orders
- View order details and status
- See coins earned (10% of order value)
- Check estimated delivery date

## 🪙 Coin Rewards

- **Sign Up:** 100 coins
- **Login:** 50 coins
- **Add to Cart:** 5 coins per item
- **Place Order:** 10% of order value

## 📱 Features

✅ User authentication (signup/login)
✅ Product catalog with filtering
✅ Shopping cart with quantity control
✅ Checkout with delivery form
✅ Order management and tracking
✅ Coin rewards system
✅ Responsive design (mobile-friendly)
✅ Local storage (data persists)

## 🎨 Customization

### Change Products
Edit `src/App.js` line 11-16:
```javascript
const products = [
  { id: 1, name: 'Your Product', category: 'shirt', price: 1299, emoji: '👕' },
  // Add more products...
];
```

### Change Colors
Edit `src/App.css` gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Email
Replace `rm2778643@gmail.com` in:
- `src/App.js` (LoginPage and SignupPage components)

## 🚀 Deploy Online

**Fastest:** Use Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Click Deploy
4. Done! Get live URL

**Alternative:** Netlify, GitHub Pages (see DEPLOYMENT.md)

## 🆘 Troubleshooting

**Issue:** `npm install` fails
**Fix:** Update Node.js to v16+ from [nodejs.org](https://nodejs.org)

**Issue:** Port 3000 already in use
**Fix:** Run `npm start` on different port or kill process using port 3000

**Issue:** Changes not reflecting
**Fix:** Clear browser cache (Ctrl+Shift+R) or restart dev server

## 📞 Support

- GitHub Issues: [Create Issue](https://github.com/rahul700raj/fashion-store-ecommerce/issues)
- Email: rm2778643@gmail.com

## 🎯 Next Steps

1. ✅ Run the app locally
2. ✅ Test all features
3. ✅ Customize products and design
4. ✅ Deploy to Vercel/Netlify
5. ⬜ Add payment gateway
6. ⬜ Integrate Gmail API
7. ⬜ Add backend database
8. ⬜ Implement real authentication

---

**Happy Shopping! 🛍️**