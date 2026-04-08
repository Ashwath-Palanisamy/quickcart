import '../styles/Header.css';

function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="header">
      <span className="header__logo">
        Quick<span>Cart</span>
      </span>
      <button className="header__cart-btn" onClick={onCartClick} aria-label="Open shopping cart">
        <span className="header__cart-icon">🛒</span>
        <span className="header__cart-label">Cart</span>
        {cartItemCount > 0 && (
          <span className="header__cart-badge">{cartItemCount}</span>
        )}
      </button>
    </header>
  );
}

export default Header;
