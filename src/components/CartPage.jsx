import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="app-content">
        <div className="empty-state">
          <span className="empty-state__icon">🛒</span>
          <p>Your cart is empty.</p>
          <Link className="empty-state__btn" to="/">Start shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="app-content">
      <div className="cart-page">
        <h2 className="cart-page__heading">Your Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})</h2>

        <div className="cart-page__layout">
          <div className="cart-page__items">
            {cart.map((item) => (
              <div className="cart-page__item" key={item.id}>
                <img className="cart-page__item-image" src={item.image} alt={item.name} />
                <div className="cart-page__item-info">
                  <span className="cart-page__item-name">{item.name}</span>
                  <span className="cart-page__item-category">{item.category}</span>
                  <span className="cart-page__item-price">${item.price.toFixed(2)} each</span>
                  <div className="cart-page__item-controls">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-item__qty">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <span className="cart-page__item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="cart-item__remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <h3 className="cart-page__summary-title">Order Summary</h3>
            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-page__summary-row">
              <span>Shipping</span>
              <span className="cart-page__free">Free</span>
            </div>
            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="cart-sidebar__checkout-btn cart-page__checkout-btn">
              Checkout
            </button>
            <button className="cart-sidebar__clear-btn" onClick={clearCart}>
              Clear cart
            </button>
            <Link className="cart-page__continue-link" to="/">
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
