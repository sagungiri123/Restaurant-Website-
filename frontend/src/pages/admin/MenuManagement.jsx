import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

const emptyItem = { name: '', description: '', category: 'Sekuwa', price: '', image: '' };
const categories = ['Sekuwa', 'BBQ', 'Nepali Thali', 'Beverages'];

export default function MenuManagement() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyItem);
    const [saving, setSaving] = useState(false);

    const fetchItems = () => {
        api.get('/menu')
            .then((res) => setItems(res.data.data))
            .catch(() => toast.error('Failed to load menu'))
            .finally(() => setLoading(false));
    };

    useEffect(fetchItems, []);

    const openCreate = () => { setEditing(null); setForm(emptyItem); setModal(true); };
    const openEdit = (item) => { setEditing(item._id); setForm({ name: item.name, description: item.description, category: item.category, price: item.price, image: item.image }); setModal(true); };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = { ...form, price: Number(form.price) };
            if (editing) {
                await api.put(`/menu/${editing}`, data);
                toast.success('Item updated');
            } else {
                await api.post('/menu', data);
                toast.success('Item created');
            }
            setModal(false);
            fetchItems();
        } catch (err) {
            toast.error(err.response?.data?.errors?.[0]?.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await api.delete(`/menu/${id}`);
            toast.success('Item deleted');
            setItems((prev) => prev.filter((i) => i._id !== id));
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-bold text-white">Menu Management</h1>
                <button onClick={openCreate} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-5 py-2.5 rounded-xl transition-colors">
                    <FiPlus /> Add Item
                </button>
            </div>

            {loading ? (
                <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
            ) : (
                <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-sm text-gray-400 font-medium">Item</th>
                                <th className="px-6 py-4 text-sm text-gray-400 font-medium hidden md:table-cell">Category</th>
                                <th className="px-6 py-4 text-sm text-gray-400 font-medium">Price</th>
                                <th className="px-6 py-4 text-sm text-gray-400 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <span className="text-white font-medium">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full">{item.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-brand-400 font-medium">Rs. {item.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => openEdit(item)} className="text-gray-400 hover:text-white p-2 transition-colors"><FiEdit2 size={16} /></button>
                                        <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-400 p-2 transition-colors"><FiTrash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setModal(false)} />
                    <form onSubmit={handleSubmit} className="relative bg-dark-800 rounded-2xl p-8 border border-white/10 w-full max-w-lg space-y-5">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-display text-xl font-semibold text-white">{editing ? 'Edit Item' : 'New Item'}</h2>
                            <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><FiX size={22} /></button>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                            <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                                <select name="category" value={form.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors">
                                    {categories.map((c) => <option key={c} value={c} className="bg-dark-800">{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Price (Rs.)</label>
                                <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Image URL</label>
                            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                            {saving ? 'Saving...' : editing ? 'Update Item' : 'Create Item'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
