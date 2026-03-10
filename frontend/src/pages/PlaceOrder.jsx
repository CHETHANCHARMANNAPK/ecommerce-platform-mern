import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [shippingAddress, setShippingAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const address = localStorage.getItem('shippingAddress');
        if (!address) {
            navigate('/shipping');
            return;
        }
        setShippingAddress(JSON.parse(address));

        const method = localStorage.getItem('paymentMethod');
        if (!method) {
            navigate('/payment');
            return;
        }
        setPaymentMethod(method);

    }, [user, navigate]);

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            setError('');
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                config
            );

            setLoading(false);
            clearCart();
            localStorage.removeItem('cartItems');
            // Assuming successful placement redirects to an order view or shows success
            alert('Order placed successfully! Order ID: ' + data._id);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Review Order</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div className="flex-col gap-3">
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Shipping</h2>
                        <p>
                            <strong style={{ color: 'var(--text-secondary)' }}>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Payment Method</h2>
                        <p>
                            <strong style={{ color: 'var(--text-secondary)' }}>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className="flex-col gap-2">
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: index < cartItems.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: index < cartItems.length - 1 ? '1rem' : 0 }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden' }}>
                                            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <Link to={`/product/${item.product}`} style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            {item.qty} x ${item.price.toFixed(2)} = <span className="price" style={{ fontSize: '1.1rem' }}>${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            Order Summary
                        </h2>
                        
                        <div className="flex justify-between items-center mb-2">
                            <span style={{ color: 'var(--text-secondary)' }}>Items:</span>
                            <span style={{ fontSize: '1.1rem' }}>${itemsPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <span style={{ color: 'var(--text-secondary)' }}>Shipping:</span>
                            <span style={{ fontSize: '1.1rem' }}>${shippingPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Tax:</span>
                            <span style={{ fontSize: '1.1rem' }}>${taxPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total:</span>
                            <span className="price" style={{ fontSize: '1.5rem' }}>${totalPrice.toFixed(2)}</span>
                        </div>

                        {error && (
                            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--border-radius-sm)', color: 'var(--danger)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <button 
                            className="btn btn-primary btn-block flex justify-center items-center gap-1"
                            disabled={cartItems.length === 0 || loading}
                            onClick={placeOrderHandler}
                            style={{ padding: '1rem' }}
                        >
                            {loading ? 'Processing...' : <><CheckCircle size={18} /> Place Order</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
