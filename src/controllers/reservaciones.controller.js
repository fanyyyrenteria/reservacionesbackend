import Reservacion from "../models/reservacion.models.js";
import Notificacion from "../models/notificacion.models.js";

import Mesa from "../models/mesa.models.js";

export const getReservaciones = async (req, res) => {
  try {
    const reservaciones = await Reservacion.find()
      .populate("id_usuario", "nombre email telefono")
      .populate("id_mesa", "numero_mesa capacidad")
      .sort({ fecha: -1 });
    res.json(reservaciones);
  } catch (error) {
    console.error("Error en getReservaciones:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getReservacionesPendientes = async (req, res) => {
  try {
    const reservaciones = await Reservacion.find({ estado: "pendiente" })
      .populate("id_usuario", "nombre email telefono")
      .populate("id_mesa", "numero_mesa capacidad")
      .sort({ fecha: 1 });
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservacionesByUser = async (req, res) => {
  try {
    const reservaciones = await Reservacion.find({ id_usuario: req.params.userId })
      .populate("id_mesa", "numero_mesa capacidad")
      .sort({ fecha: -1 });
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearReservacion = async (req, res) => {
  try {
    const reservacion = new Reservacion(req.body);
    await reservacion.save();
    
    // Actualizar estado de la mesa
    await Mesa.findByIdAndUpdate(req.body.id_mesa, { estado: "reservada" });
    
    res.json({ message: "Reservación creada", reservacion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmarReservacion = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByIdAndUpdate(
      req.params.id,
      { estado: "confirmada" },
      { new: true }
    ).populate("id_usuario id_mesa");
    
    // Crear notificación
    const notificacion = new Notificacion({
      id_reservacion: reservacion._id,
      mensaje: `Su reservación para la mesa ${reservacion.id_mesa.numero_mesa} ha sido confirmada para el ${reservacion.fecha} a las ${reservacion.hora}`,
      tipo: "confirmacion"
    });
    await notificacion.save();
    
    res.json({ message: "Reservación confirmada", reservacion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rechazarReservacion = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByIdAndUpdate(
      req.params.id,
      { estado: "rechazada" },
      { new: true }
    ).populate("id_usuario id_mesa");
    
    // Liberar la mesa
    await Mesa.findByIdAndUpdate(reservacion.id_mesa._id, { estado: "disponible" });
    
    // Crear notificación
    const notificacion = new Notificacion({
      id_reservacion: reservacion._id,
      mensaje: `Su reservación para la mesa ${reservacion.id_mesa.numero_mesa} del ${reservacion.fecha} ha sido rechazada. Por favor contacte al restaurante.`,
      tipo: "rechazo"
    });
    await notificacion.save();
    
    res.json({ message: "Reservación rechazada", reservacion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelarReservacion = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByIdAndUpdate(
      req.params.id,
      { estado: "cancelada" },
      { new: true }
    ).populate("id_mesa");
    
    // Liberar la mesa
    await Mesa.findByIdAndUpdate(reservacion.id_mesa._id, { estado: "disponible" });
    
    res.json({ message: "Reservación cancelada", reservacion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotificacionesByUser = async (req, res) => {
  try {
    // Primero obtener todas las reservaciones del usuario
    const reservaciones = await Reservacion.find({ id_usuario: req.params.userId });
    const reservacionIds = reservaciones.map(r => r._id);
    
    // Luego obtener las notificaciones de esas reservaciones
    const notificaciones = await Notificacion.find({
      id_reservacion: { $in: reservacionIds }
    }).populate("id_reservacion").sort({ fecha_envio: -1 });
    
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservacion = async (req, res) => {
  try {
    const reservacion = await Reservacion.findById(req.params.id)
      .populate("id_usuario", "nombre email telefono")
      .populate("id_mesa", "numero_mesa capacidad");
    
    if (!reservacion) {
      return res.status(404).json({ message: "Reservación no encontrada" });
    }
    
    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
