import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-fade-up">
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="MS Logo" className="w-16 h-16 object-contain invert mix-blend-screen mx-auto" />
                    <h1 className="font-display text-3xl font-bold text-white mt-3">Admin Login</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage your restaurant</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">
                            Create one
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
