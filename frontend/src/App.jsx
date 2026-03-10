import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <Navbar />
            <main className="main-content container animate-fade-in">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/placeorder" element={<PlaceOrder />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
