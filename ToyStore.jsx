import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

/* ---------- Styles (embedded so everything lives in one file) ---------- */
const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #fff7ed;
  color: #1e293b;
}

/* ---------- Header / Navigation ---------- */
header {
  background: #f97316;
  color: white;
  padding: 18px;
  text-align: center;
}

header h1 {
  margin: 0 0 10px;
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 22px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 3px;
}

nav a.active {
  border-bottom: 3px solid white;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 70vh;
}

footer {
  background: #7c2d12;
  color: white;
  text-align: center;
  padding: 14px;
}

footer p {
  margin: 0;
}

/* ---------- Hero ---------- */
.hero {
  text-align: center;
  background: linear-gradient(135deg, #fed7aa, #fde68a);
  padding: 40px 20px;
  border-radius: 16px;
}

.hero h2 {
  margin-top: 0;
  font-size: 32px;
  color: #9a3412;
}

.section-title {
  text-align: center;
  color: #9a3412;
  margin: 30px 0 18px;
}

/* ---------- Product grid ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
}

.toy-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 16px #00000014;
  transition: transform 0.2s;
}

.toy-card:hover {
  transform: translateY(-5px);
}

.toy-card .emoji {
  font-size: 64px;
}

.toy-card h3 {
  margin: 8px 0;
}

.tag {
  display: inline-block;
  background: #ffedd5;
  color: #9a3412;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #15803d;
  margin: 10px 0 0;
}

/* ---------- Filters ---------- */
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filters input {
  flex: 2;
}

.filters select {
  flex: 1;
}

.empty {
  text-align: center;
  color: #64748b;
}

/* ---------- Cards and forms ---------- */
.card {
  max-width: 480px;
  margin: 20px auto;
  padding: 28px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px #00000014;
}

.card.wide {
  max-width: 680px;
}

.card h2 {
  text-align: center;
  color: #9a3412;
}

label {
  display: block;
  margin-top: 14px;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 11px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
}

input:focus,
select:focus {
  outline: 2px solid #fdba74;
  border-color: #f97316;
}

small {
  display: block;
  color: #dc2626;
  margin-top: 5px;
}

button,
.button {
  display: inline-block;
  margin-top: 14px;
  padding: 11px 18px;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

button:hover,
.button:hover {
  background: #ea580c;
}

.card button[type="submit"],
.toy-card button,
.card.wide > button {
  width: 100%;
}

button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.success {
  color: #15803d;
  font-weight: bold;
  text-align: center;
}

/* ---------- Cart ---------- */
.cart-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.cart-name {
  flex: 2;
  font-weight: bold;
}

.qty {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty button {
  margin: 0;
  padding: 4px 12px;
}

.cart-price {
  flex: 1;
  text-align: right;
  font-weight: bold;
}

button.remove {
  margin: 0;
  padding: 4px 10px;
  background: #ef4444;
}

.total {
  text-align: right;
  color: #9a3412;
}

/* ---------- Responsive ---------- */
@media (max-width: 600px) {
  .card {
    padding: 18px;
  }

  nav {
    gap: 14px;
  }

  .hero h2 {
    font-size: 24px;
  }

  .filters {
    flex-direction: column;
  }

  .cart-row {
    flex-wrap: wrap;
  }
}
`;

/* ---------- Product data ---------- */
const TOYS = [
  { id: 1, name: "Teddy Bear", category: "Soft Toys", price: 499, emoji: "🧸" },
  { id: 2, name: "Toy Car", category: "Vehicles", price: 299, emoji: "🚗" },
  { id: 3, name: "Building Blocks", category: "Educational", price: 699, emoji: "🧱" },
  { id: 4, name: "Puzzle Set", category: "Educational", price: 399, emoji: "🧩" },
  { id: 5, name: "Robot", category: "Electronic", price: 1299, emoji: "🤖" },
  { id: 6, name: "Rocket Ship", category: "Vehicles", price: 599, emoji: "🚀" },
  { id: 7, name: "Doll House", category: "Dolls", price: 1499, emoji: "🏠" },
  { id: 8, name: "Fashion Doll", category: "Dolls", price: 549, emoji: "👧" }
];

const CATEGORIES = ["All", "Soft Toys", "Vehicles", "Educational", "Electronic", "Dolls"];

/* ---------- Reusable components ---------- */
function Navbar({ cartCount }) {
  return (
    <header>
      <h1>🧸 Toy World</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toys">Toys</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 Toy World – Making childhood happier!</p>
    </footer>
  );
}

function ToyCard({ toy, onAdd }) {
  return (
    <div className="toy-card">
      <div className="emoji">{toy.emoji}</div>
      <h3>{toy.name}</h3>
      <span className="tag">{toy.category}</span>
      <p className="price">₹{toy.price}</p>
      <button onClick={() => onAdd(toy.id)}>Add to Cart</button>
    </div>
  );
}

/* ---------- Pages ---------- */
function Home({ onAdd }) {
  return (
    <>
      <section className="hero">
        <h2>Welcome to Toy World</h2>
        <p>Fun, safe and colourful toys for every age. Shop online and bring smiles home!</p>
        <Link className="button" to="/toys">Shop Now</Link>
      </section>
      <h2 className="section-title">Featured Toys</h2>
      <div className="grid">
        {TOYS.slice(0, 4).map((t) => (
          <ToyCard key={t.id} toy={t} onAdd={onAdd} />
        ))}
      </div>
    </>
  );
}

function Toys({ onAdd }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const visible = TOYS.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2 className="section-title">Our Toys</h2>
      <div className="filters">
        <input
          placeholder="Search toys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      {visible.length === 0 ? (
        <p className="empty">No toys found.</p>
      ) : (
        <div className="grid">
          {visible.map((t) => (
            <ToyCard key={t.id} toy={t} onAdd={onAdd} />
          ))}
        </div>
      )}
    </>
  );
}

function Cart({ cart, onChangeQty, onRemove, onClear }) {
  const [ordered, setOrdered] = useState(false);

  const items = cart.map((c) => ({ ...TOYS.find((t) => t.id === c.id), qty: c.qty }));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = () => {
    onClear();
    setOrdered(true);
  };

  if (ordered && items.length === 0) {
    return (
      <div className="card">
        <h2>Thank You!</h2>
        <p className="success">Your order has been placed successfully 🎉</p>
        <Link className="button" to="/toys">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card">
        <h2>Your Cart</h2>
        <p className="empty">Your cart is empty.</p>
        <Link className="button" to="/toys">Browse Toys</Link>
      </div>
    );
  }

  return (
    <div className="card wide">
      <h2>Your Cart</h2>
      {items.map((i) => (
        <div className="cart-row" key={i.id}>
          <span className="cart-name">{i.emoji} {i.name}</span>
          <div className="qty">
            <button onClick={() => onChangeQty(i.id, -1)}>−</button>
            <span>{i.qty}</span>
            <button onClick={() => onChangeQty(i.id, 1)}>+</button>
          </div>
          <span className="cart-price">₹{i.price * i.qty}</span>
          <button className="remove" onClick={() => onRemove(i.id)}>✕</button>
        </div>
      ))}
      <h3 className="total">Total: ₹{total}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    gender: "",
    state: ""
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* Each rule returns an error message, or "" when the field is valid */
  const rules = {
    name: (v) =>
      !v.trim()
        ? "Name is required."
        : !/^[A-Za-z ]+$/.test(v.trim())
        ? "Name must contain letters and spaces only."
        : "",
    email: (v) =>
      !v
        ? "Email is required."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Enter a valid email address."
        : "",
    password: (v) =>
      !v
        ? "Password is required."
        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
        ? "Use uppercase, lowercase, a number and at least 8 characters."
        : "",
    age: (v) =>
      !v
        ? "Age is required."
        : !/^\d+$/.test(v) || Number(v) < 18 || Number(v) > 30
        ? "Age must be between 18 and 30."
        : "",
    mobile: (v) =>
      !v
        ? "Mobile number is required."
        : !/^\d{10}$/.test(v)
        ? "Enter exactly 10 digits."
        : "",
    gender: (v) => (!v ? "Gender is required." : ""),
    state: (v) => (!v ? "State is required." : "")
  };

  const errors = {};
  Object.keys(rules).forEach((k) => {
    errors[k] = rules[k](form[k]);
  });
  const valid = Object.values(errors).every((e) => e === "");

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const markTouched = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) setSubmitted(true);
  };

  const showError = (field) =>
    touched[field] && errors[field] && <small>{errors[field]}</small>;

  return (
    <div className="card">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={updateField}
          onBlur={markTouched} placeholder="Enter your name" />
        {showError("name")}

        <label>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={updateField}
          onBlur={markTouched} placeholder="Enter your email" />
        {showError("email")}

        <label>Password</label>
        <input name="password" type="password" value={form.password}
          onChange={updateField} onBlur={markTouched}
          placeholder="Minimum 8 characters" />
        {showError("password")}

        <label>Age</label>
        <input name="age" type="number" value={form.age} onChange={updateField}
          onBlur={markTouched} placeholder="Enter age (18–30)" />
        {showError("age")}

        <label>Mobile Number</label>
        <input name="mobile" type="tel" value={form.mobile} onChange={updateField}
          onBlur={markTouched} placeholder="10-digit mobile number" />
        {showError("mobile")}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={updateField}
          onBlur={markTouched}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {showError("gender")}

        <label>State</label>
        <select name="state" value={form.state} onChange={updateField}
          onBlur={markTouched}>
          <option value="">Select state</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>
        {showError("state")}

        <button type="submit" disabled={!valid}>Register</button>
        {submitted && (
          <p className="success">Registration completed successfully!</p>
        )}
      </form>
    </div>
  );
}

/* ---------- App (holds the shared cart state) ---------- */
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    const exists = cart.find((c) => c.id === id);
    if (exists) {
      setCart(cart.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  const changeQty = (id, delta) =>
    setCart(
      cart
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );

  const removeItem = (id) => setCart(cart.filter((c) => c.id !== id));

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <BrowserRouter>
      <style>{styles}</style>
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/toys" element={<Toys onAdd={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onChangeQty={changeQty}
                onRemove={removeItem}
                onClear={() => setCart([])}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
