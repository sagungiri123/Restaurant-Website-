import { useState, useEffect } from 'react';
import api from '../services/api';
import MenuCard from '../components/MenuCard';
import LoadingSpinner from '../components/LoadingSpinner';

const categories = ['All', 'Sekuwa', 'BBQ', 'Nepali Thali', 'Beverages'];

export default function Menu() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/menu')
            .then((res) => setItems(res.data.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filtered = items.filter((item) => {
        const matchCat = active === 'All' || item.category === active;
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-up">
                    <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">Explore</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Our Menu</h1>
                    <p className="text-gray-400 max-w-lg mx-auto">Discover our carefully crafted dishes, from traditional sekuwa to hearty Nepali thali plates.</p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${active === cat
                                    ? 'bg-brand-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No dishes found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((item) => (
                            <MenuCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
