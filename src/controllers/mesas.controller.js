import Mesa from "../models/mesa.models.js";

export const obtenerMesas = async (req, res) => {
  const mesas = await Mesa.find();
  res.json(mesas);
};

export const crearMesa = async (req, res) => {
  const mesa = new Mesa(req.body);
  await mesa.save();
  res.json({ message: "Mesa creada", mesa });
};

export const actualizarEstadoMesa = async (req, res) => {
  try {
    const { estado } = req.body;
    const mesaId = req.params.id;
    
    const mesa = await Mesa.findByIdAndUpdate(
      mesaId,
      { estado },
      { new: true }
    );
    
    if (!mesa) {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }
    
    res.json({ message: "Estado de mesa actualizado", mesa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const liberarMesa = async (req, res) => {
  try {
    const mesaId = req.params.id;
    
    const mesa = await Mesa.findByIdAndUpdate(
      mesaId,
      { estado: "disponible" },
      { new: true }
    );
    
    if (!mesa) {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }
    
    res.json({ message: "Mesa liberada", mesa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
