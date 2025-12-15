import mongoose from "mongoose";
import dotenv from "dotenv";
import Reservacion from "./src/models/reservacion.models.js";
import User from "./src/models/user.models.js";
import Mesa from "./src/models/mesa.models.js";

dotenv.config({ path: "./src/.env" });

async function fixReservaciones() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Conectado a la base de datos");

    // Obtener todas las reservaciones
    const reservaciones = await Reservacion.find();
    console.log(`Total de reservaciones: ${reservaciones.length}`);

    let eliminadas = 0;

    for (const reservacion of reservaciones) {
      let debeEliminar = false;

      // Verificar si el usuario existe
      if (reservacion.id_usuario) {
        const usuario = await User.findById(reservacion.id_usuario);
        if (!usuario) {
          console.log(`Reservación ${reservacion._id} tiene usuario inexistente: ${reservacion.id_usuario}`);
          debeEliminar = true;
        }
      } else {
        console.log(`Reservación ${reservacion._id} no tiene usuario asignado`);
        debeEliminar = true;
      }

      // Verificar si la mesa existe
      if (reservacion.id_mesa) {
        const mesa = await Mesa.findById(reservacion.id_mesa);
        if (!mesa) {
          console.log(`Reservación ${reservacion._id} tiene mesa inexistente: ${reservacion.id_mesa}`);
          debeEliminar = true;
        }
      } else {
        console.log(`Reservación ${reservacion._id} no tiene mesa asignada`);
        debeEliminar = true;
      }

      if (debeEliminar) {
        await Reservacion.findByIdAndDelete(reservacion._id);
        eliminadas++;
        console.log(`✓ Reservación ${reservacion._id} eliminada`);
      }
    }

    console.log(`\nProceso completado:`);
    console.log(`- Total reservaciones: ${reservaciones.length}`);
    console.log(`- Reservaciones eliminadas: ${eliminadas}`);
    console.log(`- Reservaciones válidas: ${reservaciones.length - eliminadas}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixReservaciones();
