import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Checkout() {
    const { items, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) return toast.error('Your cart is empty');

        setSubmitting(true);
        try {
            const orderItems = items.map((i) => ({
                menuItem: i._id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
            }));

            await api.post('/orders', {
                items: orderItems,
                totalPrice,
                customerInfo: form,
            });

            clearCart();
            toast.success('Order placed successfully!');
            navigate('/order-confirmation');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to place order');
        } finally {
            setSubmitting(false);
        }
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-3xl font-bold text-white mb-8 animate-fade-up">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white/5 rounded-2xl p-8 border border-white/5 space-y-5">
                        <h2 className="font-display text-xl font-semibold text-white mb-2">Your Details</h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Phone Number *</label>
                            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Email (optional)</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Delivery Address (optional)</label>
                            <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none" />
                        </div>
                        <button type="submit" disabled={submitting} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50">
                            {submitting ? 'Placing Order...' : `Place Order — Rs. ${totalPrice}`}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/5 h-fit">
                        <h2 className="font-display text-lg font-semibold text-white mb-4">Order Summary</h2>
                        <div className="space-y-3 mb-4">
                            {items.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-gray-300">{item.name} × {item.quantity}</span>
                                    <span className="text-gray-300">Rs. {item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between">
                            <span className="text-white font-semibold">Total</span>
                            <span className="text-brand-400 font-bold text-lg">Rs. {totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
