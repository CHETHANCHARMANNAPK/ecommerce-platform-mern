import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, Number(qty));
        navigate('/cart');
    };

    if (loading) return (
        <div className="text-center mt-4">
            <div className="loader" style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%', borderTopColor: 'var(--accent-primary)', animation: 'spin 1s ease-in-out infinite' }}></div>
        </div>
    );

    if (error) return (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--danger)' }}>
            <p style={{ color: 'var(--danger)' }}>{error}</p>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <Link to="/" className="btn btn-outline mb-4 flex items-center gap-1" style={{ width: 'fit-content', padding: '0.4rem 1rem' }}>
                <ArrowLeft size={16} /> Back
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                    <img src={product.image || 'https://via.placeholder.com/600x600?text=ShopEase'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1' }} />
                </div>

                <div className="flex-col gap-2">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)' }}>{product.name}</h2>
                    <div style={{ margin: '1rem 0', height: '1px', background: 'var(--border-color)' }}></div>
                    <p className="price" style={{ fontSize: '2rem' }}>${product.price.toFixed(2)}</p>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '1rem', lineHeight: 1.6 }}>{product.description}</p>
                    
                    <div className="glass-panel mt-4" style={{ padding: '1.5rem' }}>
                        <div className="flex justify-between items-center mb-2" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                            <span className={product.countInStock > 0 ? "badge badge-in-stock" : "badge badge-out-stock"} style={{ fontSize: '1rem', padding: '0.4rem 0.8rem' }}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-3" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Qty:</span>
                                <select 
                                    style={{ width: '100px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                                    value={qty} 
                                    onChange={(e) => setQty(e.target.value)}
                                >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1} style={{ background: 'var(--bg-secondary)' }}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button 
                            className="btn btn-primary btn-block mt-2 flex items-center justify-center gap-1" 
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                            style={{ padding: '1rem' }}
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
