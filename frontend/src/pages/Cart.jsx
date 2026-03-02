import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="py-20 text-center animate-fade-up">
                <FiShoppingBag className="mx-auto text-gray-600 mb-4" size={48} />
                <h1 className="font-display text-2xl font-bold text-white mb-2">Your cart is empty</h1>
                <p className="text-gray-400 mb-6">Browse our menu and add something delicious!</p>
                <Link to="/menu" className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-display text-3xl font-bold text-white mb-8 animate-fade-up">Your Cart</h1>

                <div className="space-y-4 mb-8">
                    {items.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                            <img src={item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100'} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold truncate">{item.name}</h3>
                                <p className="text-brand-400 font-medium">Rs. {item.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
                                    <FiMinus size={14} />
                                </button>
                                <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <span className="text-white font-semibold w-20 text-right">Rs. {item.price * item.quantity}</span>
                            <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-300 transition-colors p-2">
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="flex justify-between items-center text-lg mb-6">
                        <span className="text-gray-300">Total</span>
                        <span className="text-white font-bold text-2xl">Rs. {totalPrice}</span>
                    </div>
                    <Link to="/checkout" className="block w-full bg-brand-600 hover:bg-brand-500 text-white text-center font-semibold py-3.5 rounded-xl transition-colors">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
