import mongoose from 'mongoose';
import User from './models/user.models.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        // Usar la URL de MongoDB desde las variables de entorno
        const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/reserva';
        await mongoose.connect(mongoURL);
        console.log('✅ Conectado a MongoDB');
        
        // Eliminar usuario admin si existe
        await User.deleteMany({ role: 'admin' });
        
        // Crear nuevo admin
        const passwordHash = await bcryptjs.hash('Admin.2025#', 10);
        
        const admin = new User({
            username: 'Admin',
            email: 'admin@admin.com',
            password: passwordHash,
            role: 'admin',
            nombre: 'Maggie Brown',
            telefono: '1234567890'
        });
        
        await admin.save();
        console.log('✅ Usuario administrador creado:');
        console.log('   Email: admin@admin.com');
        console.log('   Password: Admin.2025#');
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

createAdmin();
