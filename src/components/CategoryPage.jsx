import { useParams, Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import ProductList from './ProductList';
import products from '../data/products';

function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  const displayCategory = categories.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  ) || category;
  const isValidCategory = !!displayCategory && categories
    .map((c) => c.toLowerCase())
    .includes(category.toLowerCase());

  if (!isValidCategory) {
    return (
      <main className="app-content">
        <div className="empty-state">
          <span className="empty-state__icon">🗂️</span>
          <p>Category &ldquo;{category}&rdquo; not found.</p>
          <Link className="empty-state__btn" to="/">Back to all products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="app-content">
      <h2 className="category-page__heading">{displayCategory}</h2>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">📦</span>
          <p>No products in this category yet.</p>
          <Link className="empty-state__btn" to="/">Browse all products</Link>
        </div>
      ) : (
        <ProductList products={filtered} onAddToCart={addToCart} />
      )}
    </main>
  );
}

export default CategoryPage;
