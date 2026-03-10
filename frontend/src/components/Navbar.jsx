import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
            <div className="container flex items-center justify-between" style={{ height: 'var(--navbar-height)' }}>
                <Link to="/" className="flex items-center gap-1">
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>ShopEase</span>
                </Link>

                <nav className="flex items-center gap-2">
                    <Link to="/cart" className="flex items-center gap-1 hover:text-accent" style={{ position: 'relative', transition: 'color 0.2s' }}>
                        <ShoppingCart size={22} color="var(--text-secondary)" />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-12px',
                                background: 'var(--danger)',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2" style={{ marginLeft: '1rem' }}>
                            <Link to="/profile" className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                                <User size={20} />
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="badge badge-in-stock">Admin</Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1" style={{ marginLeft: '1rem' }}>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
