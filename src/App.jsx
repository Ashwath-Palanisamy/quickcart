import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CartSidebar from './components/CartSidebar';
import useCart from './hooks/useCart';
import './styles/App.css';

function App() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        {isCartOpen && (
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
        )}
        <CartSidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;