import mongoose from 'mongoose';
import User from './src/models/user.models.js';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Conectado a MongoDB\n');
        
        const admin = await User.findOne({ email: 'admin@admin.com' });
        
        if (admin) {
            console.log('👤 Usuario Admin encontrado:');
            console.log('   ID:', admin._id);
            console.log('   Email:', admin.email);
            console.log('   Nombre:', admin.nombre);
            console.log('   Role:', admin.role);
            console.log('   Role Type:', typeof admin.role);
        } else {
            console.log('❌ No se encontró usuario admin');
        }
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkAdmin();
