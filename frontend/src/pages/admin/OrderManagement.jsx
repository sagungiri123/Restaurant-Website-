import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Pending: 'bg-yellow-500/10 text-yellow-400',
    Preparing: 'bg-blue-500/10 text-blue-400',
    Completed: 'bg-green-500/10 text-green-400',
    Cancelled: 'bg-red-500/10 text-red-400',
};

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/orders')
            .then((res) => setOrders(res.data.data))
            .catch(() => toast.error('Failed to load orders'))
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await api.put(`/orders/${id}`, { status });
            setOrders((prev) => prev.map((o) => (o._id === id ? res.data.data : o)));
            toast.success(`Order ${status.toLowerCase()}`);
        } catch {
            toast.error('Failed to update status');
        }
    };

    if (loading) {
        return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-24 rounded-xl" />)}</div>;
    }

    return (
        <div className="animate-fade-up">
            <h1 className="font-display text-2xl font-bold text-white mb-6">Orders ({orders.length})</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-12">No orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <p className="text-white font-semibold">{order.customerInfo.name}</p>
                                    <p className="text-gray-400 text-sm">{order.customerInfo.phone}</p>
                                    <p className="text-gray-500 text-xs mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                                    >
                                        {['Pending', 'Preparing', 'Completed', 'Cancelled'].map((s) => (
                                            <option key={s} value={s} className="bg-dark-800">{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5 mb-3">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-gray-300">{item.name} × {item.quantity}</span>
                                        <span className="text-gray-400">Rs. {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/5 pt-3 flex justify-between">
                                <span className="text-gray-400 text-sm">Total</span>
                                <span className="text-brand-400 font-bold">Rs. {order.totalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
