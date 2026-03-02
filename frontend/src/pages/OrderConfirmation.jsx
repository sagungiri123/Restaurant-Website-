import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderConfirmation() {
    return (
        <div className="py-20 px-4 text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                <FiCheckCircle className="text-green-400" size={40} />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">Order Placed!</h1>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                Thank you for your order! We're preparing your food with love. You'll receive a confirmation shortly.
            </p>
            <div className="flex items-center justify-center gap-4">
                <Link to="/menu" className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
                    Order More
                </Link>
                <Link to="/" className="border border-white/20 hover:border-brand-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors hover:text-brand-400">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
