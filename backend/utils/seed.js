require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Menu = require('../models/Menu');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Menu.deleteMany({});

        // Create admin
        await User.create({
            name: 'Admin',
            email: 'admin@mamakosekuwa.com',
            password: 'admin123',
            role: 'admin',
        });
        console.log('Admin user created: admin@mamakosekuwa.com / admin123');

        // Seed menu items
        const menuItems = [
            // Sekuwa
            { name: 'Chicken Sekuwa', description: 'Tender chicken marinated in traditional Nepali spices, grilled over charcoal fire.', category: 'Sekuwa', price: 350, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
            { name: 'Mutton Sekuwa', description: 'Succulent pieces of mutton skewered and grilled with a blend of aromatic herbs.', category: 'Sekuwa', price: 500, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400' },
            { name: 'Buff Sekuwa', description: 'Premium buffalo meat marinated overnight and charcoal-grilled to perfection.', category: 'Sekuwa', price: 400, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },

            // BBQ
            { name: 'BBQ Chicken Wings', description: 'Smoky chicken wings glazed with our house-made BBQ sauce.', category: 'BBQ', price: 300, image: 'https://images.unsplash.com/photo-1527477396000-e27163b68265?w=400' },
            { name: 'BBQ Pork Ribs', description: 'Slow-cooked pork ribs with a sticky sweet and spicy glaze.', category: 'BBQ', price: 550, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
            { name: 'Grilled Fish', description: 'Fresh river fish seasoned with local spices and grilled whole.', category: 'BBQ', price: 450, image: 'https://images.unsplash.com/photo-1510130113-5043e532bf20?w=400' },

            // Nepali Thali
            { name: 'Veg Dal Bhat', description: 'Traditional Nepali thali with steamed rice, lentil soup, seasonal vegetables, and pickles.', category: 'Nepali Thali', price: 250, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
            { name: 'Chicken Dal Bhat', description: 'Complete Nepali thali set with chicken curry, dal, rice, achar, and greens.', category: 'Nepali Thali', price: 350, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400' },
            { name: 'Mutton Dal Bhat', description: 'Premium thali featuring tender mutton curry with all traditional accompaniments.', category: 'Nepali Thali', price: 450, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400' },

            // Beverages
            { name: 'Masala Tea', description: 'Aromatic Nepali chiya brewed with fresh ginger, cardamom, and cinnamon.', category: 'Beverages', price: 60, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
            { name: 'Lassi', description: 'Refreshing yogurt-based drink, available sweet or salted.', category: 'Beverages', price: 120, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400' },
            { name: 'Fresh Lime Soda', description: 'Sparkling lime soda with a hint of mint — the perfect thirst quencher.', category: 'Beverages', price: 80, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400' },
        ];

        await Menu.insertMany(menuItems);
        console.log(`${menuItems.length} menu items seeded`);

        await mongoose.disconnect();
        console.log('Seed complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
};

seedData();
