import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useContext(AuthContext);

    const queryRedirect = location.search ? location.search.split('=')[1] : '/';
    const redirect = queryRedirect.startsWith('/') ? queryRedirect : `/${queryRedirect}`;

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        const res = await login(email, password);
        if (!res.success) {
            setErrorMsg(res.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Welcome Back</h2>
                    <p className="text-muted mt-1">Sign in to your account</p>
                </div>

                {errorMsg && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--border-radius-sm)', color: 'var(--danger)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={submitHandler} className="flex-col gap-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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

                    <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isLoading} style={{ height: '48px' }}>
                        {isLoading ? 'Signing In...' : <><LogIn size={20} /> Sign In</>}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="text-muted">
                        New customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
