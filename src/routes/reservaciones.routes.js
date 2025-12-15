import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
  getReservaciones,
  getReservacionesPendientes,
  getReservacionesByUser,
  getReservacion,
  crearReservacion,
  confirmarReservacion,
  rechazarReservacion,
  cancelarReservacion,
  getNotificacionesByUser
} from "../controllers/reservaciones.controller.js";

const router = Router();

// Rutas de consulta
router.get("/", getReservaciones); // Temporalmente sin authRequired para debugging
router.get("/pendientes", authRequired, getReservacionesPendientes);
router.get("/usuario/:userId", authRequired, getReservacionesByUser);
router.get("/notificaciones/:userId", authRequired, getNotificacionesByUser);
router.get("/:id", authRequired, getReservacion);

// Rutas de acción
router.post("/", authRequired, crearReservacion);
router.put("/:id/confirmar", authRequired, confirmarReservacion);
router.put("/:id/rechazar", authRequired, rechazarReservacion);
router.put("/:id/cancelar", authRequired, cancelarReservacion);

export default router;
