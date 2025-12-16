import app from './app.js';
import { connectDB} from './db.js'
import dotenv from "dotenv";
import { createAdminUser } from './libs/initialSetup.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Intentar cargar .env desde src/ o desde la raíz
dotenv.config({ path: join(__dirname, '.env') });
if (!process.env.MONGODB_URL) {
    dotenv.config({ path: join(__dirname, '../.env') });
}

connectDB();
createAdminUser();

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log(`Servidor corriendo en el puerto ${PORT}`);