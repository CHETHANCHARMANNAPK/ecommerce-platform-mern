import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="glass-panel p-card animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform var(--transition-normal)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <Link to={`/product/${product._id}`} style={{ display: 'block', overflow: 'hidden', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'rgba(255,255,255,0.05)', aspectRatio: '1' }}>
                <img src={product.image || 'https://via.placeholder.com/300x300?text=ShopEase'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
            
            <div className="flex-col gap-1" style={{ flex: 1, display: 'flex' }}>
                <Link to={`/product/${product._id}`}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{product.name}</h3>
                </Link>
                
                <div className="flex items-center justify-between mt-1" style={{ marginTop: 'auto' }}>
                    <span className="price">${product.price.toFixed(2)}</span>
                    <Link to={`/product/${product._id}`} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
