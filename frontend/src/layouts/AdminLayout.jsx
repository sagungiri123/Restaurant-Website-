import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiBook, FiShoppingBag, FiCalendar, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/admin', icon: <FiGrid />, label: 'Dashboard', end: true },
    { to: '/admin/menu', icon: <FiBook />, label: 'Menu' },
    { to: '/admin/orders', icon: <FiShoppingBag />, label: 'Orders' },
    { to: '/admin/reservations', icon: <FiCalendar />, label: 'Reservations' },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen flex bg-dark-900">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-800 border-r border-white/5 transform transition-transform duration-200 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:shrink-0`}>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <Link to="/admin" className="flex items-center gap-2">
                        <img src="/logo.png" alt="MS Logo" className="w-7 h-7 object-contain invert mix-blend-screen" />
                        <span className="font-display text-lg font-bold text-white">Admin Panel</span>
                    </Link>
                    <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}><FiX size={22} /></button>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                            {item.icon} {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                    <div className="text-sm text-gray-400 mb-3 px-4">{user?.name}</div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-dark-900 shrink-0">
                    <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(true)}><FiMenu size={22} /></button>
                    <Link to="/" className="text-sm text-brand-400 hover:text-brand-300 transition-colors ml-auto">← Back to Website</Link>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
