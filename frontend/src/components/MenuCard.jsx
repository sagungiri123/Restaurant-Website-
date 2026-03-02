import { FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function MenuCard({ item }) {
    const { addItem } = useCart();

    const handleAdd = () => {
        addItem(item);
        toast.success(`${item.name} added to cart`);
    };

    return (
        <div className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
                    <span className="text-brand-400 font-bold whitespace-nowrap">Rs. {item.price}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                <button
                    onClick={handleAdd}
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium py-2.5 rounded-xl transition-colors duration-200"
                >
                    <FiPlus size={16} /> Add to Cart
                </button>
            </div>
        </div>
    );
}
