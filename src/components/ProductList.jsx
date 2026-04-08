import ProductCard from './ProductCard';
import '../styles/ProductList.css';

function ProductList({ products, onAddToCart }) {
  return (
    <section>
      <h2 className="product-list__heading">Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
