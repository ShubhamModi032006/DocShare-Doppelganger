require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const DEMO_USERS = [
    {
        name: 'Admin User',
        email: 'admin@docshare.com',
        password: 'admin123',
        role: 'Administrator',
        avatar: 'AU',
    },
    {
        name: 'Partner Lawyer',
        email: 'partner@docshare.com',
        password: 'partner123',
        role: 'Partner',
        avatar: 'PL',
    },
    {
        name: 'Client User',
        email: 'client@docshare.com',
        password: 'client123',
        role: 'Client',
        avatar: 'CU',
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');

        for (const demo of DEMO_USERS) {
            const exists = await User.findOne({ email: demo.email });
            if (exists) {
                console.log(`⚠️  User already exists: ${demo.email} — skipping`);
                continue;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(demo.password, salt);
            await User.create({ ...demo, password: hashedPassword });
            console.log(`✅ Created: ${demo.name} (${demo.email}) — role: ${demo.role}`);
        }

        console.log('\n🎉 Seed complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
};

seed();
