/* =============================================
   PAWSPALS - MAIN JAVASCRIPT
   ============================================= */

// =============================================
// SHOP CATEGORY NAVIGATION
// =============================================
function initShopNavigation() {
  const dogShopBtn = document.querySelector('a[data-target="dogs"]');
  const catShopBtn = document.querySelector('a[data-target="cats"]');
  
  if (dogShopBtn) {
    dogShopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById('tab-dogs').checked = true;
        document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }
  
  if (catShopBtn) {
    catShopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById('tab-cats').checked = true;
        document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }
}

// =============================================
// SEARCH FUNCTIONALITY
// =============================================
let isSearchActive = false;

function initSearch() {
  const searchInput = document.getElementById('search');
  const searchBtn = document.getElementById('search-btn');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (!searchInput) return;

  // Search button click
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      performSearch(query);
    }
  });

  // Enter key in search input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        performSearch(query);
      }
    }
  });

  // Clear search button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearch();
  });
}

function performSearch(query) {
  isSearchActive = true;
  const allProducts = document.querySelectorAll('.product');
  const clearBtn = document.getElementById('clear-search-btn');
  let foundCount = 0;

  allProducts.forEach(product => {
    const productName = product.querySelector('h4').textContent.toLowerCase();
    if (productName.includes(query)) {
      product.style.display = 'block';
      foundCount++;
    } else {
      product.style.display = 'none';
    }
  });

  // Show clear button
  clearBtn.style.display = 'block';

  // Show "No products found" message if needed
  if (foundCount === 0) {
    showNoProductsMessage();
  } else {
    removeNoProductsMessage();
  }
}

function clearSearch() {
  isSearchActive = false;
  const allProducts = document.querySelectorAll('.product');
  const clearBtn = document.getElementById('clear-search-btn');
  
  allProducts.forEach(product => {
    product.style.display = 'block';
  });

  clearBtn.style.display = 'none';
  removeNoProductsMessage();
}

function showNoProductsMessage() {
  // Remove existing message if any
  removeNoProductsMessage();

  const tabsContent = document.querySelector('.tabs-content');
  if (!tabsContent) return;

  const message = document.createElement('div');
  message.id = 'no-products-message';
  message.style.cssText = `
    text-align: center;
    padding: 60px 20px;
    color: #7b8794;
    font-size: 18px;
    font-weight: 600;
  `;
  message.innerHTML = `
    <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
    <p>No products found for your search.</p>
    <p style="font-size: 14px; margin-top: 8px; color: #a8b5c4;">Try searching with a different name.</p>
  `;

  tabsContent.insertAdjacentElement('afterend', message);
}

function removeNoProductsMessage() {
  const message = document.getElementById('no-products-message');
  if (message) {
    message.remove();
  }
}

// =============================================
// CART MANAGEMENT
// =============================================
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.updateCartCount();
  }

  loadCart() {
    const saved = localStorage.getItem('pawspals_cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('pawspals_cart', JSON.stringify(this.cart));
  }

  addToCart(product) {
    const existing = this.cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
      this.updateCartCount();
    }
  }

  updateCartCount() {
    const cartBtn = document.querySelector('a[href="cart.html"]');
    if (cartBtn) {
      const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBtn.textContent = `Cart (${count})`;
    }
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return sum + (price * item.quantity);
    }, 0);
  }

  showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #ff7a59;
      color: white;
      padding: 16px 24px;
      border-radius: 10px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 3000);
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// =============================================
// PRODUCT ADD TO CART - INDEX PAGE
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Add to cart buttons on index page
  const addButtons = document.querySelectorAll('.product .add');
  
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const productCard = btn.closest('.product');
      const product = {
        id: Math.random().toString(36).substr(2, 9),
        name: productCard.querySelector('h4').textContent,
        price: productCard.querySelector('.price').textContent,
        img: productCard.querySelector('img').src
      };
      
      cartManager.addToCart(product);
    });
  });

  // Cart page - display items
  if (document.querySelector('.cart-items')) {
    displayCartItems();
  }
});

// =============================================
// CART PAGE - DISPLAY ITEMS
// =============================================
function displayCartItems() {
  const cartItemsDiv = document.querySelector('.cart-items');
  const emptyCart = cartItemsDiv.querySelector('.empty-cart');
  const template = cartItemsDiv.querySelector('.cart-item-template');
  
  if (cartManager.cart.length === 0) {
    emptyCart.style.display = 'block';
    return;
  }
  
  emptyCart.style.display = 'none';
  
  cartItemsDiv.querySelectorAll('.cart-item').forEach(item => item.remove());
  
  cartManager.cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    const itemPrice = parseFloat(item.price.replace('₹', '').replace(',', ''));
    const itemTotal = itemPrice * item.quantity;
    
    cartItem.innerHTML = `
      <div class="item-image">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <p class="item-price">${item.price}</p>
      </div>
      <div class="item-quantity">
        <button class="qty-btn minus" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
        <button class="qty-btn plus" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
      </div>
      <div class="item-total">₹${itemTotal.toLocaleString()}</div>
      <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
    `;
    
    cartItemsDiv.appendChild(cartItem);
  });
  
  updateCartSummary();
}

function updateQuantity(productId, quantity) {
  cartManager.updateQuantity(productId, parseInt(quantity));
  displayCartItems();
}

function removeFromCart(productId) {
  cartManager.removeFromCart(productId);
  displayCartItems();
}

function updateCartSummary() {
  const subtotal = cartManager.getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  document.querySelector('.subtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.querySelector('.shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.querySelector('.tax').textContent = `₹${tax.toFixed(2)}`;
  document.querySelector('.total-amount').textContent = `₹${total.toLocaleString()}`;
}

// =============================================
// LOGIN FORM SUBMISSION
// =============================================
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('email', email);
    formData.append('password', password);
    
    try {
      const response = await fetch('backend.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  });
}

// =============================================
// REGISTRATION FORM SUBMISSION
// =============================================
const registrationForm = document.querySelector('form') || null;
if (registrationForm && window.location.pathname.includes('Form.html')) {
  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(registrationForm);
    formData.append('action', 'register');
    formData.append('store', document.getElementById('store')?.value || '');
    formData.append('pet_preference', document.getElementById('pet_preference')?.value || '');
    formData.append('feedback', document.getElementById('feedback')?.value || '');
    
    try {
      const response = await fetch('backend.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering');
    }
  });
}

// =============================================
// CHECKOUT FUNCTIONALITY
// =============================================
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please login first');
      window.location.href = 'login.html';
      return;
    }
    
    const formData = new FormData();
    formData.append('action', 'checkout');
    formData.append('cart', JSON.stringify(cartManager.cart));
    formData.append('total', cartManager.getCartTotal());
    
    try {
      const response = await fetch('backend.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Order placed successfully!');
        cartManager.cart = [];
        cartManager.saveCart();
        cartManager.updateCartCount();
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error during checkout');
    }
  });
}

// =============================================
// INITIALIZE SEARCH & SHOP NAV
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initShopNavigation();
});

// =============================================
// ANIMATION
// =============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
