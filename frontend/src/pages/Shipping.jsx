import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Truck } from 'lucide-react';

const Shipping = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=shipping');
        }
        const shippingAddress = localStorage.getItem('shippingAddress');
        if (shippingAddress) {
            const parsed = JSON.parse(shippingAddress);
            setAddress(parsed.address || '');
            setCity(parsed.city || '');
            setPostalCode(parsed.postalCode || '');
            setCountry(parsed.country || '');
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const shippingData = { address, city, postalCode, country };
        localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
        navigate('/payment');
    };

    return (
        <div className="flex items-center justify-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Shipping Address</h2>
                    <p className="text-muted mt-1">Enter your delivery details</p>
                </div>

                <form onSubmit={submitHandler} className="flex-col gap-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="address" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="city" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>City</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="postalCode" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="country" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Country</label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4 flex justify-center items-center gap-1" style={{ height: '48px' }}>
                        Continue to Payment <Truck size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
