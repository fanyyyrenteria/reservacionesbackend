import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const cleanDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/reserva');
        console.log('✅ Conectado a MongoDB');
        
        // Eliminar la base de datos completa
        await mongoose.connection.dropDatabase();
        console.log('✅ Base de datos eliminada');
        
        await mongoose.connection.close();
        console.log('✅ Conexión cerrada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

cleanDatabase();
