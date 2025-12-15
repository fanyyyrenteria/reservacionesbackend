import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mesasRoutes from "./routes/mesas.routes.js";
import reservacionesRoutes from "./routes/reservaciones.routes.js";

//Importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js';


const app = express();

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Indicamos que el servidor utilice el objeto authRoutes
app.use('/api/',authRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/reservaciones", reservacionesRoutes);


export default app;
