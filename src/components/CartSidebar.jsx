import '../styles/CartSidebar.css';

function CartSidebar({ isOpen, cart, onUpdateQuantity, onRemoveItem, onClose, onClearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-sidebar${isOpen ? ' open' : ''}`} role="dialog" aria-label="Shopping cart">
      <div className="cart-sidebar__header">
        <h2 className="cart-sidebar__title">Your Cart ({cart.length})</h2>
        <button className="cart-sidebar__close-btn" onClick={onClose} aria-label="Close cart">
          ✕
        </button>
      </div>

      <div className="cart-sidebar__items">
        {cart.length === 0 ? (
          <div className="cart-sidebar__empty">
            <span className="cart-sidebar__empty-icon">🛒</span>
            Your cart is empty
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item__image" src={item.image} alt={item.name} />
              <div className="cart-item__info">
                <span className="cart-item__name">{item.name}</span>
                <span className="cart-item__price">${item.price.toFixed(2)} each</span>
                <div className="cart-item__controls">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="cart-item__qty">{item.quantity}</span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="cart-item__subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="cart-item__remove-btn"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-sidebar__footer">
          <div className="cart-sidebar__total">
            <span>Total</span>
            <span className="cart-sidebar__total-amount">${total.toFixed(2)}</span>
          </div>
          <button className="cart-sidebar__checkout-btn">Checkout</button>
          <button className="cart-sidebar__clear-btn" onClick={onClearCart}>
            Clear cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
