import { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiCheck } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Reservation() {
    const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: 2 });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/reservations', { ...form, guests: Number(form.guests) });
            toast.success('Table reserved successfully!');
            setSuccess(true);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to reserve');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="py-20 px-4 text-center animate-fade-up">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                    <FiCheck className="text-green-400" size={36} />
                </div>
                <h1 className="font-display text-3xl font-bold text-white mb-3">Reservation Confirmed!</h1>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Your table for {form.guests} guests on {form.date} at {form.time} has been reserved. We look forward to seeing you!
                </p>
                <button onClick={() => { setSuccess(false); setForm({ name: '', phone: '', date: '', time: '', guests: 2 }); }}
                    className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
                    Make another reservation
                </button>
            </div>
        );
    }

    return (
        <div className="py-12 px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-12 animate-fade-up">
                    <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">Book Your Spot</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Reserve a Table</h1>
                    <p className="text-gray-400">Secure your seat for an unforgettable dining experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Phone Number</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-1 text-sm text-gray-400 mb-1.5"><FiCalendar size={14} /> Date</label>
                            <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                            <label className="flex items-center gap-1 text-sm text-gray-400 mb-1.5"><FiClock size={14} /> Time</label>
                            <input name="time" type="time" value={form.time} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center gap-1 text-sm text-gray-400 mb-1.5"><FiUsers size={14} /> Number of Guests</label>
                        <select name="guests" value={form.guests} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                                <option key={n} value={n} className="bg-dark-800">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50">
                        {submitting ? 'Reserving...' : 'Reserve Table'}
                    </button>
                </form>
            </div>
        </div>
    );
}
