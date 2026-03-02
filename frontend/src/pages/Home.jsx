import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiMapPin, FiPhone, FiStar } from 'react-icons/fi';

const featuredDishes = [
    { name: 'Chicken Sekuwa', desc: 'Charcoal-grilled chicken with Nepali spices', price: 350, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
    { name: 'Mutton Dal Bhat', desc: 'Premium thali with tender mutton curry', price: 450, img: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400' },
    { name: 'BBQ Pork Ribs', desc: 'Slow-cooked ribs with sweet spicy glaze', price: 550, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
];

const testimonials = [
    { name: 'Aarav Sharma', text: 'Best sekuwa in Lalitpur! The flavors are absolutely authentic. My whole family loves coming here every weekend.', rating: 5 },
    { name: 'Priya Adhikari', text: 'Amazing family dining experience. The mutton sekuwa and dal bhat are to die for. Highly recommended!', rating: 5 },
];

export default function Home() {
    return (
        <div>
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
                <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-up">
                    <span className="inline-block text-brand-400 font-medium text-sm uppercase tracking-widest mb-4">Family Restaurant • Lalitpur</span>
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Mama Ko<br /><span className="text-brand-400">Sekuwa</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto">
                        Authentic Nepali Sekuwa &amp; Family Dining — Where tradition meets the finest charcoal-grilled flavors.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/reservations" className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105">
                            Reserve a Table
                        </Link>
                        <Link to="/menu" className="border border-white/20 hover:border-brand-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:text-brand-400">
                            Order Now <FiArrowRight className="inline ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Dishes */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">From Our Kitchen</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Featured Dishes</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredDishes.map((d) => (
                            <div key={d.name} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-semibold text-white mb-1">{d.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{d.desc}</p>
                                    <span className="text-brand-400 font-bold text-lg">Rs. {d.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/menu" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
                            View Full Menu <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-white/[0.02]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">What People Say</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Our Guests Love Us</h2>
                        <div className="flex items-center justify-center gap-1 mt-3">
                            {[...Array(5)].map((_, i) => <FiStar key={i} className="text-brand-400 fill-brand-400" />)}
                            <span className="text-gray-300 ml-2 text-sm">5.0 Rating</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-white/5 rounded-2xl p-8 border border-white/5">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="text-brand-400 fill-brand-400" size={16} />)}
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                                <p className="text-white font-semibold">{t.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Bar */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <FiClock className="text-brand-400" size={28} />, label: 'Opening Hours', value: 'Open daily until 11 PM' },
                        { icon: <FiMapPin className="text-brand-400" size={28} />, label: 'Location', value: 'M8CR+JQ8, Lalitpur 44600' },
                        { icon: <FiPhone className="text-brand-400" size={28} />, label: 'Call Us', value: '974-9453158' },
                    ].map((info) => (
                        <div key={info.label} className="flex items-center gap-4 bg-white/5 rounded-2xl p-6 border border-white/5">
                            {info.icon}
                            <div>
                                <p className="text-gray-400 text-sm">{info.label}</p>
                                <p className="text-white font-medium">{info.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Map */}
            <section className="px-4 pb-16">
                <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.577!2d85.325!3d27.670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzEyLjAiTiA4NcKwMTknMzAuMCJF!5e0!3m2!1sen!2snp!4v1"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Mama Ko Sekuwa Location"
                    />
                </div>
            </section>
        </div>
    );
}
