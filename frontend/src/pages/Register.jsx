import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.confirmPassword);
            toast.success('Account created! Welcome aboard 🎉');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-fade-up">
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="MS Logo" className="w-16 h-16 object-contain invert mix-blend-screen mx-auto" />
                    <h1 className="font-display text-3xl font-bold text-white mt-3">Create Account</h1>
                    <p className="text-gray-400 mt-2">Join Mama Ko Sekuwa family</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={update}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={update}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={update}
                            required
                            minLength={6}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={update}
                            required
                            minLength={6}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="Re-enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/admin/login" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
