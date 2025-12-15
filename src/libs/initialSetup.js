import User from '../models/user.models.js';
import Mesa from '../models/mesa.models.js';
import bcryptjs from 'bcryptjs';

export const createAdminUser = async () => {
    try {
        const adminEmail = process.env.SETUP_ADMIN_EMAIL || 'admin@eltitanic.com';
        const adminUsername = process.env.SETUP_ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.SETUP_ADMIN_PWD || 'admin123';
        const adminRole = process.env.SETUP_ROLE_ADMIN || 'admin';
        
        // Verificar si ya existe un usuario admin
        const adminExists = await User.findOne({ email: adminEmail });
        
        if (!adminExists) {
            // Remover comillas simples si existen en la contraseña
            const cleanPassword = adminPassword.replace(/^'|'$/g, '');
            const passwordHash = await bcryptjs.hash(cleanPassword, 10);
            
            const admin = new User({
                username: adminUsername,
                email: adminEmail,
                password: passwordHash,
                role: adminRole,
                nombre: 'Maggie Brown',
                telefono: '1234567890'
            });
            
            await admin.save();
            console.log('✅ Usuario administrador creado:');
            console.log('   Email:', adminEmail);
            console.log('   Password:', cleanPassword);
        }
        
        // Crear mesas de ejemplo
        const mesasCount = await Mesa.countDocuments();
        if (mesasCount === 0) {
            const mesas = [];
            for (let i = 1; i <= 20; i++) {
                mesas.push({
                    numero_mesa: i,
                    capacidad: i <= 12 ? 4 : 2,
                    estado: 'disponible'
                });
            }
            await Mesa.insertMany(mesas);
            console.log('✅ 20 mesas creadas exitosamente');
        }
    } catch (error) {
        console.error('❌ Error en setup inicial:', error);
    }
};
