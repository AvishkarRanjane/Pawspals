# 🐾 PawsPals - Pet Shop Web Application

## Project Overview
PawsPals is a complete pet shop e-commerce web application with user authentication, shopping cart functionality, and customer management system.

## Features
✅ Product catalog with multiple pet categories
✅ Shopping cart with persistent storage (LocalStorage)
✅ User registration with store and pet preference selection
✅ Customer feedback collection
✅ User login system
✅ Order management
✅ Responsive design for all devices
✅ Database storage for user data and orders

---

## 📁 Project Structure

```
CA2 project/
├── index.html           # Main shop page
├── Form.html            # Registration page
├── login.html           # Login page
├── cart.html            # Shopping cart page
├── style.css            # Main shop styles
├── style1.css           # Registration form styles
├── style2.css           # Login form styles
├── style3.css           # Cart page styles
├── main.js              # Frontend JavaScript (cart, forms)
├── backend.php          # Backend PHP (database operations)
├── database.sql         # Database schema
└── README.md            # This file
```

---

## 🛠 Installation & Setup

### Step 1: Set Up Database
1. Open **phpMyAdmin** or MySQL command line
2. Run the `database.sql` file to create the database and tables:
   ```sql
   SOURCE database.sql;
   ```
   Or copy-paste the entire content of `database.sql`

### Step 2: Configure Backend
1. Open `backend.php`
2. Update database credentials if needed:
   ```php
   $servername = "localhost";  // Your MySQL server
   $username = "root";          // Your MySQL username
   $password = "";              // Your MySQL password
   $dbname = "pawspals";        // Database name
   ```

### Step 3: Place Files on Web Server
- Copy all files to your web server directory:
  - **XAMPP**: `C:\xampp\htdocs\pawspals\`
  - **WAMP**: `C:\wamp\www\pawspals\`
  - **LAMP**: `/var/www/html/pawspals/`

### Step 4: Start Server
- Start Apache and MySQL from XAMPP/WAMP Control Panel
- Open browser: `http://localhost/pawspals/index.html`

---

## 📱 How to Use

### For Customers:

**1. Browse Products**
- Visit the main shop (index.html)
- Click on categories or search products
- Click "Add to Cart" to add items

**2. View Cart**
- Click "Cart (0)" in header to view shopping cart
- Adjust quantities or remove items
- See real-time total calculation

**3. Register**
- Click "Registration Form" button
- Fill in details including:
  - Full name, email, gender, DOB
  - **Preferred Store Location** (new!)
  - **Pet Preference** (new!)
  - **Feedback & Requirements** (new!)
- Account created successfully

**4. Login**
- Click "Login" button
- Enter email and password
- Check "Remember me" option to stay logged in

**5. Checkout**
- Must be logged in
- Click "Proceed to Checkout" in cart
- Order is placed and stored in database

---

## 🗄 Database Schema

### Tables:

**customers**
- Stores user registration data
- Includes: name, email, password, gender, DOB, preferred_store, pet_preference, feedback

**products**
- Product catalog
- Includes: name, category, price, description, image, stock

**orders**
- Customer orders
- Includes: customer_id, total_amount, status, payment_status

**order_items**
- Individual items in orders
- Links orders to products

**cart**
- Persistent cart storage (optional)

---

## 🔄 Workflow

### Cart Functionality:
```
User clicks "Add to Cart" → main.js captures product data → 
Stored in browser's LocalStorage → Cart count updates → 
User navigates to cart.html → main.js displays saved items
```

### Registration Flow:
```
User fills form → Clicks "Register Now" → main.js validates → 
Sends to backend.php → PHP validates and inserts to database → 
Success message → Redirects to login.html
```

### Login & Checkout:
```
User enters credentials → backend.php verifies → 
User stored in localStorage → User can checkout → 
Order saved to database → Cart cleared
```

---

## 🆕 New Features Added

### Registration Enhancements:
1. **Preferred Store Location**
   - 6 store options across India
   - Helps with targeted marketing

2. **Pet Preference Selection**
   - Dogs, Cats, Birds, Fish, Small Pets, All Pets
   - Used for personalized recommendations

3. **Feedback & Requirements**
   - TextArea for customer feedback
   - Collects improvement suggestions
   - Captures new pet care needs

### Cart System:
- Add/remove products
- Update quantities
- Real-time cart count
- Persistent storage (survives page refresh)
- Automatic total calculation with tax & shipping

---

## 📊 Sample Login Credentials (for testing)

**Email:** john@example.com  
**Password:** (Use DOB from database)

**Email:** sarah@example.com  
**Password:** (Use DOB from database)

Or create new account via registration form.

---

## ⚙️ Technical Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** PHP 7+
- **Database:** MySQL / MariaDB
- **Storage:** Browser LocalStorage (cart), Database (orders)

---

## 🐛 Troubleshooting

**Problem:** Cart not updating
- Clear browser cache
- Check localStorage in DevTools

**Problem:** Registration not working
- Ensure database.sql was executed
- Check database connection in backend.php
- Verify email format

**Problem:** Login fails
- Ensure backend.php is accessible
- Check database connection
- Verify credentials in customers table

**Problem:** Checkout button not working
- Must be logged in
- Check if cart has items
- Check backend.php permissions

---

## 📝 Notes

- **Security:** For production, implement proper password hashing, CSRF tokens, and prepared statements
- **Testing:** Use browser DevTools Console to check for errors
- **Mobile:** All pages are fully responsive
- **Compatibility:** Works on all modern browsers

---

## 👨‍💻 Developer Notes

### Extending Features:

**Add Payment Gateway:**
- Integrate Razorpay or PayPal in checkout section

**Email Notifications:**
- Add PHPMailer for order confirmations

**Admin Panel:**
- Create admin dashboard for order management

**Search Functionality:**
- Add product search with filters

---

## 📞 Support

For issues or questions, check:
1. Browser console (F12 → Console)
2. Network tab for failed requests
3. PHP error logs
4. Database logs

---

**Created:** January 2025
**Version:** 1.0
**Status:** Active Development

🐾 Happy Pet Shopping! 🐾
