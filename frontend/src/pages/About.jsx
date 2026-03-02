import { FiMapPin, FiUsers, FiHeart } from 'react-icons/fi';

export default function About() {
    return (
        <div className="py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-up">
                    <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">Our Story</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">About Mama Ko Sekuwa</h1>
                </div>

                {/* Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="rounded-2xl overflow-hidden border border-white/5">
                        <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                            alt="Restaurant interior"
                            className="w-full h-80 object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h2 className="font-display text-2xl font-bold text-white mb-4">A Taste of Home</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Mama Ko Sekuwa was born from a simple idea — to bring the warmth of a Nepali mother's kitchen
                            to every table. Nestled in the heart of Lalitpur, our restaurant serves authentic charcoal-grilled
                            sekuwa prepared using recipes passed down through generations.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            What started as a small family eatery has grown into a beloved destination for food lovers.
                            Every dish we serve carries the love, care, and authentic flavors that remind you of home.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <FiHeart className="text-brand-400" size={28} />, title: 'Made with Love', desc: 'Every dish is prepared with genuine care and authentic Nepali spices.' },
                        { icon: <FiUsers className="text-brand-400" size={28} />, title: 'Family Dining', desc: 'A warm, welcoming space designed for families and friends to gather.' },
                        { icon: <FiMapPin className="text-brand-400" size={28} />, title: 'Local Roots', desc: 'Proudly serving Lalitpur with the best charcoal-grilled flavors since day one.' },
                    ].map((v) => (
                        <div key={v.title} className="bg-white/5 rounded-2xl p-8 border border-white/5 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-600/10 rounded-xl mb-4">{v.icon}</div>
                            <h3 className="font-display text-lg font-semibold text-white mb-2">{v.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Atmosphere Image */}
                <div className="rounded-2xl overflow-hidden border border-white/5">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200"
                        alt="Dining atmosphere"
                        className="w-full h-64 md:h-96 object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
