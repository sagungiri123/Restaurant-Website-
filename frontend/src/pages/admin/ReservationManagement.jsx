import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ReservationManagement() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/reservations')
            .then((res) => setReservations(res.data.data))
            .catch(() => toast.error('Failed to load reservations'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>;
    }

    return (
        <div className="animate-fade-up">
            <h1 className="font-display text-2xl font-bold text-white mb-6">Reservations ({reservations.length})</h1>

            {reservations.length === 0 ? (
                <p className="text-gray-500 text-center py-12">No reservations yet.</p>
            ) : (
                <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Name</th>
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Phone</th>
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Date</th>
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Time</th>
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Guests</th>
                                    <th className="px-6 py-4 text-sm text-gray-400 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((r) => (
                                    <tr key={r._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{r.name}</td>
                                        <td className="px-6 py-4 text-gray-300">{r.phone}</td>
                                        <td className="px-6 py-4 text-gray-300">{r.date}</td>
                                        <td className="px-6 py-4 text-gray-300">{r.time}</td>
                                        <td className="px-6 py-4 text-gray-300">{r.guests}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-medium">{r.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
