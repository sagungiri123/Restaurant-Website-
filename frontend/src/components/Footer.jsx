import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="bg-dark-900 border-t border-white/5 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2"><img src="/logo.png" alt="MS Logo" className="w-7 h-7 object-contain invert mix-blend-screen inline-block" /> Mama Ko Sekuwa</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Authentic Nepali Sekuwa &amp; Family Dining. Serving the best charcoal-grilled flavors in Lalitpur since generations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {[{ to: '/menu', label: 'Our Menu' }, { to: '/reservations', label: 'Reserve a Table' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to} className="hover:text-brand-400 transition-colors">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 text-brand-400 shrink-0" /> M8CR+JQ8, Lalitpur 44600, Nepal</li>
                            <li className="flex items-center gap-2"><FiPhone className="text-brand-400 shrink-0" /> 974-9453158</li>
                            <li className="flex items-center gap-2"><FiClock className="text-brand-400 shrink-0" /> Open daily until 11 PM</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Mama Ko Sekuwa. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
