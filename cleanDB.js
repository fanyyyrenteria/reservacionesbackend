import mongoose from 'mongoose';
import Reservacion from './src/models/reservacion.models.js';

const MONGODB_URL = 'mongodb://127.0.0.1:27017/reserva';

async function cleanDatabase() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Conectado a MongoDB');
        
        const result = await Reservacion.deleteMany({});
        console.log(`${result.deletedCount} reservaciones eliminadas`);
        
        await mongoose.disconnect();
        console.log('Base de datos limpiada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

cleanDatabase();
