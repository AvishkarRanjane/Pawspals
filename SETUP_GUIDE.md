# 🚀 PawsPals Setup Guide

## Quick Start (5 Minutes)

### Requirements:
- XAMPP / WAMP / LAMP installed
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)

---

## Step-by-Step Setup

### 1️⃣ Database Setup

**Option A: Using phpMyAdmin**
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "New" → Create new database called `pawspals`
3. Click on `pawspals` database
4. Click "Import" tab
5. Choose `database.sql` file and click "Go"
6. ✅ Database created!

**Option B: Using MySQL Command Line**
```bash
mysql -u root -p
CREATE DATABASE pawspals;
USE pawspals;
SOURCE /path/to/database.sql;
```

---

### 2️⃣ File Placement

**For XAMPP:**
```
C:\xampp\htdocs\
  └── pawspals/
      ├── index.html
      ├── Form.html
      ├── login.html
      ├── cart.html
      ├── style.css
      ├── style1.css
      ├── style2.css
      ├── style3.css
      ├── main.js
      ├── backend.php
      └── database.sql
```

---

### 3️⃣ Test the Application

1. Start **XAMPP Control Panel**
   - Click "Start" next to Apache
   - Click "Start" next to MySQL

2. Open browser and go to:
   ```
   http://localhost/pawspals/index.html
   ```

3. You should see the PawsPals shop homepage! 🎉

---

## 🧪 Testing Checklist

- [ ] Homepage loads correctly
- [ ] Products display in all categories
- [ ] "Add to Cart" button works
- [ ] Cart count increases (top right)
- [ ] Cart page shows added items
- [ ] Registration form loads
- [ ] Store dropdown works
- [ ] Pet preference dropdown works
- [ ] Feedback textarea appears
- [ ] Form submission works
- [ ] Login page loads
- [ ] Login form works

---

## 🔧 Configuration

### If Database Connection Fails:

Open `backend.php` and verify:

```php
$servername = "localhost";  // Change if needed
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password
$dbname = "pawspals";       // Database name
```

**Common Issues:**
- Wrong username/password → Update accordingly
- Database doesn't exist → Run database.sql again
- Wrong port (3306) → Check your MySQL port

---

## 📱 Features Demonstration

### Try These Actions:

1. **Add Products to Cart**
   - Click "Shop Dogs" or "Shop Cats"
   - Click "Add to Cart" on any product
   - Check cart count in header increases

2. **View Cart**
   - Click "Cart (X)" button
   - See products with prices
   - Try increasing/decreasing quantity
   - See total update automatically

3. **Register New Account**
   - Click "Registration Form"
   - Fill in all fields
   - Select store location
   - Select pet preference
   - Add feedback
   - Click "Register Now"
   - Should redirect to login page

4. **Login**
   - Enter registered email
   - Use any password
   - Click "Login"
   - Should redirect to homepage

5. **Checkout**
   - Add items to cart
   - Go to cart page
   - Click "Proceed to Checkout"
   - Must be logged in
   - Order should be created

---

## 📊 Check Database Data

To verify data is being saved:

```sql
-- Check registered customers
SELECT * FROM customers;

-- Check orders
SELECT * FROM orders;

-- Check order items
SELECT * FROM order_items;

-- Check products
SELECT * FROM products;
```

Run in phpMyAdmin → SQL tab

---

## 🐛 Debug Mode

### Check Console for Errors:
1. Open Browser DevTools (F12)
2. Go to "Console" tab
3. Look for any red error messages
4. Check "Network" tab for failed requests

### Check PHP Errors:
1. Open `backend.php` in browser
2. Should show `{"success":false,"message":"Invalid action"}`
3. If you see PHP error, check:
   - Syntax errors
   - Database connection
   - File permissions

---

## 📞 Common Issues & Solutions

### ❌ "Cannot connect to database"
**Solution:**
- Check MySQL is running
- Verify username/password in backend.php
- Check database exists: `SHOW DATABASES;`

### ❌ "Form not submitting"
**Solution:**
- Check browser console (F12)
- Ensure main.js is linked
- Verify backend.php path

### ❌ "Cart not updating"
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check LocalStorage in DevTools
- Refresh page

### ❌ "Products not showing"
**Solution:**
- Check database.sql was fully executed
- Verify products table has data
- Check image URLs in HTML

---

## 🎯 Next Steps (Optional Features)

After basic setup, you can add:

1. **Payment Gateway** (Razorpay/PayPal)
2. **Email Notifications** (PHPMailer)
3. **Admin Dashboard** (Orders management)
4. **Product Search** (AJAX search)
5. **Reviews System** (Customer ratings)
6. **Wishlist** (Save favorite products)

---

## ✅ Success Indicators

You've successfully set up PawsPals when:

✅ All pages load without errors
✅ Add to cart works and updates count
✅ Cart page displays items correctly
✅ Registration saves customer data
✅ Login works
✅ Database contains new customer records

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| index.html | Main shop page |
| Form.html | Registration page |
| login.html | Login page |
| cart.html | Shopping cart |
| main.js | Frontend JavaScript |
| backend.php | PHP backend |
| database.sql | Database schema |
| style.css | Main styling |
| style1.css | Form styling |
| style2.css | Login styling |
| style3.css | Cart styling |

---

## 🎓 Learning Resources

- **JavaScript Cart System:** See `CartManager` class in main.js
- **PHP Backend:** See action handlers in backend.php
- **Database:** See table relationships in database.sql
- **Forms:** See form handling in main.js

---

## 💾 Backup Important Files

Keep backups of:
- `database.sql` - Database schema
- `backend.php` - Backend code
- `main.js` - JavaScript logic
- `customer` table data if modified

---

**Setup Time:** ~5 minutes
**Difficulty:** Beginner-friendly
**Status:** Ready to use! 🚀

For detailed feature documentation, see **README.md**

---

🐾 **Welcome to PawsPals!** 🐾
