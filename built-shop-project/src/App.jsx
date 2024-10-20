import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
//COMPONENTS
import LoginPage from './Pages/LoginPage';
import AllProducts from './Pages/AllProducts';
import CartPage from './Pages/CartPage';
import ProductPage from './Pages/ProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route element={<Layout />}>
            <Route path="/all-products" element={
              <ProtectedRoute>
                <AllProducts />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
