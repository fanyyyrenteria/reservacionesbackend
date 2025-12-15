import {Router} from 'express';
import { login, register, logout, profile, verify, getClientes, searchCliente } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import mesaModels from '../models/mesa.models.js';
import { crearReservacion } from '../controllers/reservaciones.controller.js';



const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/verify', authRequired, verify);

router.get('/profile', authRequired, profile);

// Rutas de clientes
router.get('/clientes', authRequired, getClientes);
router.get('/clientes/search', authRequired, searchCliente);

router.post("/mesas", authRequired, mesaModels);

router.get("/reservaciones", authRequired, crearReservacion);

export default router;