import '../styles/ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const { name, price, category, image, description, rating } = product;

  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

  return (
    <article className="product-card">
      <img className="product-card__image" src={image} alt={name} loading="lazy" />
      <div className="product-card__body">
        <span className="product-card__category">{category}</span>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>
        <span className="product-card__rating" title={`Rating: ${rating} out of 5`}>
          {stars} ({rating})
        </span>
        <div className="product-card__footer">
          <span className="product-card__price">${price.toFixed(2)}</span>
          <button
            className="product-card__add-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
