import app from './app.js';
import { connectDB} from './db.js'
import dotenv from "dotenv";
import { createAdminUser } from './libs/initialSetup.js';

dotenv.config({ path: './src/.env' });

connectDB();
createAdminUser();

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log(`Servidor corriendo en el puerto ${PORT}`);