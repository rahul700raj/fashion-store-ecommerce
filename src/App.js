import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coins, setCoins] = useState(0);

  const products = [
    { id: 1, name: 'Classic White Shirt', category: 'shirt', price: 1299, emoji: '👕' },
    { id: 2, name: 'Blue Denim Shirt', category: 'shirt', price: 1499, emoji: '👔' },
    { id: 3, name: 'Black Formal Shirt', category: 'shirt', price: 1399, emoji: '👕' },
    { id: 4, name: 'Slim Fit Blue Jeans', category: 'jeans', price: 2499, emoji: '👖' },
    { id: 5, name: 'Regular Black Jeans', category: 'jeans', price: 2299, emoji: '👖' },
    { id: 6, name: 'Ripped Denim Jeans', category: 'jeans', price: 2799, emoji: '👖' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('fashionStore');
    if (saved) {
      const data = JSON.parse(saved);
      setUser(data.user);
      setCart(data.cart || []);
      setOrders(data.orders || []);
      setCoins(data.coins || 0);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fashionStore', JSON.stringify({ user, cart, orders, coins }));
    }
  }, [user, cart, orders, coins]);

  const handleSignup = (email, name) => {
    setUser({ email, name });
    setCoins(100);
    setPage('home');
  };

  const handleLogin = (email) => {
    setUser({ email, name: email.split('@')[0] });
    setCoins(coins + 50);
    setPage('home');
  };

  const addToCart = (product) => {
    if (!user) {
      alert('Please login first!');
      setPage('login');
      return;
    }
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
    setCoins(coins + 5);
  };

  const placeOrder = (info) => {
    const order = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      info,
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    setOrders([...orders, order]);
    setCoins(coins + Math.floor(order.total / 10));
    setCart([]);
    setPage('orders');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => setPage('home')}>🛍️ Fashion Store</div>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('products')}>Products</button>
          <button onClick={() => setPage('cart')}>Cart ({cart.length})</button>
          {user && <button onClick={() => setPage('orders')}>Orders</button>}
        </nav>
        <div className="user-section">
          {user ? (
            <>
              <div className="coins">🪙 {coins}</div>
              <div className="user-name">{user.name}</div>
              <button onClick={() => { setUser(null); setPage('home'); }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage('login')}>Login</button>
              <button onClick={() => setPage('signup')} className="btn-primary">Sign Up</button>
            </>
          )}
        </div>
      </header>

      <main className="main">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'products' && <ProductsPage products={products} addToCart={addToCart} />}
        {page === 'cart' && <CartPage cart={cart} setCart={setCart} placeOrder={placeOrder} />}
        {page === 'orders' && <OrdersPage orders={orders} />}
        {page === 'login' && <LoginPage handleLogin={handleLogin} setPage={setPage} />}
        {page === 'signup' && <SignupPage handleSignup={handleSignup} setPage={setPage} />}
      </main>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Fashion Store</h1>
        <p>Discover premium shirts & jeans. Earn coins with every purchase!</p>
        <button className="btn-large" onClick={() => setPage('products')}>Shop Now</button>
      </section>
      <section className="features">
        <div className="feature">🚚 <h3>Free Delivery</h3></div>
        <div className="feature">🪙 <h3>Earn Coins</h3></div>
        <div className="feature">✨ <h3>Premium Quality</h3></div>
      </section>
    </div>
  );
}

function ProductsPage({ products, addToCart }) {
  return (
    <div className="products">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-emoji">{p.emoji}</div>
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage({ cart, setCart, placeOrder }) {
  const [checkout, setCheckout] = useState(false);
  const [info, setInfo] = useState({ name: '', email: 'rm2778643@gmail.com', phone: '', address: '', city: '', pincode: '' });
  
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) return <div className="empty">🛒 Cart is empty</div>;

  if (checkout) {
    return (
      <div className="checkout">
        <h1>Checkout</h1>
        <form onSubmit={(e) => { e.preventDefault(); placeOrder(info); }}>
          <input placeholder="Name" value={info.name} onChange={e => setInfo({...info, name: e.target.value})} required />
          <input placeholder="Email" type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} required />
          <input placeholder="Phone" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} required />
          <textarea placeholder="Address" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} required />
          <input placeholder="City" value={info.city} onChange={e => setInfo({...info, city: e.target.value})} required />
          <input placeholder="Pincode" value={info.pincode} onChange={e => setInfo({...info, pincode: e.target.value})} required />
          <div className="checkout-actions">
            <button type="button" onClick={() => setCheckout(false)}>Back</button>
            <button type="submit" className="btn-primary">Place Order (₹{total})</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.emoji} {item.name}</span>
          <div className="qty-controls">
            <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, qty: Math.max(1, i.qty - 1)} : i))}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))}>+</button>
          </div>
          <span>₹{item.price * item.qty}</span>
          <button onClick={() => setCart(cart.filter(i => i.id !== item.id))}>🗑️</button>
        </div>
      ))}
      <div className="cart-total">
        <h2>Total: ₹{total}</h2>
        <p>🪙 Earn {Math.floor(total / 10)} coins</p>
        <button className="btn-primary" onClick={() => setCheckout(true)}>Checkout</button>
      </div>
    </div>
  );
}

function OrdersPage({ orders }) {
  if (orders.length === 0) return <div className="empty">📦 No orders yet</div>;
  
  return (
    <div className="orders">
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Order #{order.id}</h3>
            <span className="badge">{order.status}</span>
          </div>
          {order.items.map(item => (
            <div key={item.id}>{item.emoji} {item.name} x{item.qty} - ₹{item.price * item.qty}</div>
          ))}
          <div className="order-footer">
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p>🪙 Earned: {Math.floor(order.total / 10)} coins</p>
            <p>📅 {order.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoginPage({ handleLogin, setPage }) {
  const [email, setEmail] = useState('rm2778643@gmail.com');
  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(email); }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn-primary">Login & Get 50 Coins 🪙</button>
      </form>
      <p>Don't have an account? <button onClick={() => setPage('signup')}>Sign Up</button></p>
    </div>
  );
}

function SignupPage({ handleSignup, setPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('rm2778643@gmail.com');
  return (
    <div className="auth">
      <h1>Sign Up</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(email, name); }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn-primary">Sign Up & Get 100 Coins 🪙</button>
      </form>
      <p>Already have an account? <button onClick={() => setPage('login')}>Login</button></p>
    </div>
  );
}

export default App;