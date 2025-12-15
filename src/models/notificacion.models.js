import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema({
  id_reservacion: { type: mongoose.Schema.Types.ObjectId, ref: "Reservacion" },
  mensaje: String,
  tipo: String,
  fecha_envio: { type: Date, default: Date.now }
});

export default mongoose.model("Notificacion", notificacionSchema);
