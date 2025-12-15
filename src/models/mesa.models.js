import mongoose from "mongoose";

const mesaSchema = new mongoose.Schema({
  numero_mesa: 
  { type: Number, 
    required: true },
    capacidad: { type: Number, required: true },
  estado: { type: String, default: "disponible" } 
});

export default mongoose.model("Mesa", mesaSchema);
