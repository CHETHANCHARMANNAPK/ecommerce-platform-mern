import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        fetchProducts();
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/products/${id}`, config);
                fetchProducts();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post('/api/products', {}, config);
            // Ideally navigate to edit page, or just refresh
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h1 style={{ fontSize: '2.5rem' }}>Products (Admin)</h1>
                <button className="btn btn-primary flex items-center gap-1" onClick={createProductHandler}>
                    <Plus size={18} /> Create Product
                </button>
            </div>

            {loading ? (
                <div className="text-center mt-4">
                    <div className="loader" style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%', borderTopColor: 'var(--accent-primary)', animation: 'spin 1s ease-in-out infinite' }}></div>
                </div>
            ) : error ? (
                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--danger)' }}>
                    <p style={{ color: 'var(--danger)' }}>{error}</p>
                </div>
            ) : (
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>ID</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>NAME</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>PRICE</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product._id}</td>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                                        <td style={{ padding: '1rem' }}>${product.price.toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div className="flex gap-1" style={{ width: 'max-content' }}>
                                                {/* In a complete app, this would link to an edit page */}
                                                <button className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)' }}>
                                                    <Edit size={16} />
                                                </button>
                                                <button className="btn btn-outline" onClick={() => deleteHandler(product._id)} style={{ padding: '0.4rem', border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
