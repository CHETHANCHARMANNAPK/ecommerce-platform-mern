import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="glass-panel text-center" style={{ padding: '3rem' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your cart is empty.</p>
                    <Link to="/" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                    <div className="flex-col gap-2">
                        {cartItems.map((item) => (
                            <div key={item.product} className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden' }}>
                                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                
                                <div style={{ flex: 1 }}>
                                    <Link to={`/product/${item.product}`}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</h3>
                                    </Link>
                                </div>

                                <div className="price" style={{ width: '100px', textAlign: 'right', fontSize: '1.1rem' }}>
                                    ${item.price.toFixed(2)}
                                </div>

                                <div style={{ width: '100px' }}>
                                    <select 
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                                        value={item.qty} 
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1} style={{ background: 'var(--bg-secondary)' }}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <button 
                                        onClick={() => removeFromCart(item.product)}
                                        className="btn btn-outline"
                                        style={{ padding: '0.5rem', color: 'var(--danger)', borderColor: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--danger)'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                Order Summary
                            </h2>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span style={{ color: 'var(--text-secondary)' }}>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping:</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Free</span>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total:</span>
                                <span className="price" style={{ fontSize: '1.5rem' }}>
                                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                </span>
                            </div>

                            <button 
                                className="btn btn-primary btn-block flex items-center justify-center gap-1" 
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                style={{ padding: '1rem' }}
                            >
                                Proceed Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
