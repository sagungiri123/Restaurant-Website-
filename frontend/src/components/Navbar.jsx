import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { totalItems } = useCart();

    const linkClass = ({ isActive }) =>
        `transition-colors duration-200 hover:text-brand-400 ${isActive ? 'text-brand-400 font-semibold' : 'text-gray-300'}`;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/about', label: 'About' },
        { to: '/reservations', label: 'Reserve' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="MS Logo" className="w-8 h-8 object-contain invert mix-blend-screen" />
                        <span className="font-display text-xl font-bold text-white">Mama Ko Sekuwa</span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((l) => (
                            <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>
                        ))}
                        <Link to="/cart" className="relative text-gray-300 hover:text-brand-400 transition-colors">
                            <FiShoppingCart size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <HiX size={26} /> : <HiMenu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-dark-900 border-t border-white/5 px-4 pb-4">
                    {navLinks.map((l) => (
                        <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                            <div className="py-3 border-b border-white/5">{l.label}</div>
                        </NavLink>
                    ))}
                    <Link to="/cart" className="flex items-center gap-2 py-3 text-gray-300" onClick={() => setOpen(false)}>
                        <FiShoppingCart /> Cart ({totalItems})
                    </Link>
                </div>
            )}
        </nav>
    );
}
