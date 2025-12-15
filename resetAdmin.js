import mongoose from 'mongoose';
import User from './src/models/user.models.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Conectado a MongoDB\n');
        
        // Eliminar todos los usuarios admin
        const deleted = await User.deleteMany({ email: 'admin@admin.com' });
        console.log(`🗑️  Usuarios admin eliminados: ${deleted.deletedCount}\n`);
        
        // Crear nuevo admin con contraseña correcta
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
        console.log('✅ Usuario administrador RECREADO exitosamente:');
        console.log('   Email: admin@admin.com');
        console.log('   Password: Admin.2025#');
        console.log('   Role:', admin.role);
        
        // Verificar la contraseña inmediatamente
        const testMatch = await bcryptjs.compare('Admin.2025#', admin.password);
        console.log('\n🔐 Verificación de contraseña:', testMatch ? '✅ CORRECTA' : '❌ INCORRECTA');
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

resetAdmin();
