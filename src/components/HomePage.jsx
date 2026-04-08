import { useSearchParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import ProductList from './ProductList';
import products from '../data/products';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { addToCart } = useCart();

  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="app-content">
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="search"
          placeholder="Search products…"
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search products"
        />
        {searchQuery && (
          <span className="search-bar__count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🔍</span>
          <p>No products match &ldquo;{searchQuery}&rdquo;</p>
          <button className="empty-state__btn" onClick={() => setSearchParams({})}>
            Clear search
          </button>
        </div>
      ) : (
        <ProductList products={filtered} onAddToCart={addToCart} />
      )}
    </main>
  );
}

export default HomePage;
