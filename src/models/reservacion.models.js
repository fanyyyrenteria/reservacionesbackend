import mongoose from "mongoose";

const reservacionSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, 
  ref: "User", required: true },
  id_mesa: { type: mongoose.Schema.Types.ObjectId, ref: "Mesa", required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  comensales: { type: Number, default: 1 },
  estado: { type: String, default: "pendiente" }, // pendiente, confirmada, rechazada, cancelada, ocupada
  notas: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("Reservacion", reservacionSchema);
