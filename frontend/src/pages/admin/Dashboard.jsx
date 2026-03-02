import { useState, useEffect } from 'react';
import { FiShoppingBag, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import api from '../../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({ orders: 0, reservations: 0, revenue: 0, popular: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, reservationsRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/reservations'),
                ]);

                const orders = ordersRes.data.data;
                const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

                // Calculate popular items
                const itemCounts = {};
                orders.forEach((o) => {
                    o.items.forEach((i) => {
                        itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity;
                    });
                });
                const popular = Object.entries(itemCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([name, count]) => ({ name, count }));

                setStats({
                    orders: orders.length,
                    reservations: reservationsRes.data.count,
                    revenue,
                    popular,
                });
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Orders', value: stats.orders, icon: <FiShoppingBag />, color: 'text-blue-400 bg-blue-500/10' },
        { label: 'Reservations', value: stats.reservations, icon: <FiCalendar />, color: 'text-green-400 bg-green-500/10' },
        { label: 'Total Revenue', value: `Rs. ${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, color: 'text-brand-400 bg-brand-500/10' },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}
                </div>
                <div className="skeleton h-64 rounded-2xl" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-up">
            <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((c) => (
                    <div key={c.label} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 text-sm">{c.label}</span>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>{c.icon}</div>
                        </div>
                        <p className="text-white text-2xl font-bold">{c.value}</p>
                    </div>
                ))}
            </div>

            {/* Popular Items */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                    <FiTrendingUp className="text-brand-400" />
                    <h2 className="text-white font-semibold text-lg">Popular Items</h2>
                </div>
                {stats.popular.length === 0 ? (
                    <p className="text-gray-500 text-sm">No orders yet.</p>
                ) : (
                    <div className="space-y-3">
                        {stats.popular.map((item, i) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-lg bg-brand-600/20 text-brand-400 text-xs flex items-center justify-center font-bold">{i + 1}</span>
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                                <span className="text-gray-400 text-sm">{item.count} ordered</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
