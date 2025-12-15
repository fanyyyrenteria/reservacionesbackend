import { Router } from "express";
import { obtenerMesas, crearMesa, actualizarEstadoMesa, liberarMesa } from "../controllers/mesas.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get("/", obtenerMesas);
router.post("/", crearMesa); // protegido después con validateToken
router.post("/", authRequired, crearMesa);
router.put("/:id/estado", authRequired, actualizarEstadoMesa);
router.put("/:id/liberar", authRequired, liberarMesa);

export default router;
