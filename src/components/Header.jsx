import { Link, NavLink, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import products from '../data/products';
import '../styles/Header.css';

const categories = [...new Set(products.map((p) => p.category))];

function Header() {
  const { cartItemCount, toggleCart } = useCart();
  const navigate = useNavigate();

  function handleSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
    }
  }

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Quick<span>Cart</span>
      </Link>

      <nav className="header__nav" aria-label="Category navigation">
        <NavLink
          className={({ isActive }) => `header__nav-link${isActive ? ' active' : ''}`}
          to="/"
          end
        >
          Home
        </NavLink>
        {categories.map((cat) => (
          <NavLink
            key={cat}
            className={({ isActive }) => `header__nav-link${isActive ? ' active' : ''}`}
            to={`/category/${cat}`}
          >
            {cat}
          </NavLink>
        ))}
      </nav>

      <div className="header__right">
        <input
          className="header__search"
          type="search"
          placeholder="Search…"
          aria-label="Search products"
          onKeyDown={handleSearch}
        />
        <Link className="header__cart-btn" to="/cart" aria-label="View cart page">
          <span className="header__cart-icon">🛒</span>
          <span className="header__cart-label">Cart</span>
          {cartItemCount > 0 && (
            <span className="header__cart-badge">{cartItemCount}</span>
          )}
        </Link>
        <button
          className="header__cart-btn header__cart-sidebar-btn"
          onClick={toggleCart}
          aria-label="Open shopping cart"
        >
          <span className="header__cart-icon">🗂️</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
