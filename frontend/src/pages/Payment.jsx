import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CreditCard } from 'lucide-react';

const Payment = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=shipping');
        }
        const shippingAddress = localStorage.getItem('shippingAddress');
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="flex items-center justify-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Payment Method</h2>
                    <p className="text-muted mt-1">Select your preferred payment method</p>
                </div>

                <form onSubmit={submitHandler} className="flex-col gap-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <label className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', border: paymentMethod === 'PayPal' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
                            <input
                                type="radio"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ width: 'auto' }}
                            />
                            <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>PayPal or Credit Card</span>
                        </label>

                        <label className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', border: paymentMethod === 'Stripe' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
                            <input
                                type="radio"
                                id="Stripe"
                                name="paymentMethod"
                                value="Stripe"
                                checked={paymentMethod === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ width: 'auto' }}
                            />
                            <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>Stripe</span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4 flex justify-center items-center gap-1" style={{ height: '48px' }}>
                        Continue to Review <CreditCard size={18} />
                    </button>
                    
                    <button type="button" onClick={() => navigate('/shipping')} className="btn btn-outline btn-block mt-2">
                        Back to Shipping
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
