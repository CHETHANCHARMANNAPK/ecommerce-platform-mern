import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { register, user } = useContext(AuthContext);

    const queryRedirect = location.search ? location.search.split('=')[1] : '/';
    const redirect = queryRedirect.startsWith('/') ? queryRedirect : `/${queryRedirect}`;

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match');
            return;
        }

        setIsLoading(true);
        const res = await register(name, email, password);
        if (!res.success) {
            setErrorMsg(res.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center animate-fade-in" style={{ minHeight: '70vh' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Create Account</h2>
                    <p className="text-muted mt-1">Join ShopEase today</p>
                </div>

                {errorMsg && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--border-radius-sm)', color: 'var(--danger)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={submitHandler} className="flex-col gap-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <label htmlFor="confirmPassword" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4" disabled={isLoading} style={{ height: '48px' }}>
                        {isLoading ? 'Creating Account...' : <><UserPlus size={20} /> Register</>}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="text-muted">
                        Already have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
