// Importamos el modelo de datos
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

// ===============================
// REGISTRAR USUARIO
// ===============================
export const register = async (req, res) => {
    const { nombre, telefono, email, password } = req.body;

    try {
        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            nombre,
            telefono,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        const token = await createAccesToken({
            id: userSaved._id,
            role: userSaved.role
        });

        res.cookie('token', token);

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            telefono: userSaved.telefono,
            email: userSaved.email,
            role: userSaved.role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};

// ===============================
// INICIAR SESIÓN
// ===============================
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password no coincide" });
        }

        const token = await createAccesToken({
            id: userFound._id,
            role: userFound.role
        });

        res.cookie('token', token);

        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            telefono: userFound.telefono,
            email: userFound.email,
            role: userFound.role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al iniciar sesion" });
    }
};

// ===============================
// CERRAR SESIÓN
// ===============================
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

// ===============================
// VERIFICAR TOKEN
// ===============================
export const verify = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            return res.status(401).json({ message: "Usuario no autorizado" });
        }

        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            telefono: userFound.telefono,
            email: userFound.email,
            role: userFound.role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al verificar token" });
    }
};

// ===============================
// PERFIL
// ===============================
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound)
        return res.status(400).json({ message: "Usuario no encontrado" });

    res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        telefono: userFound.telefono,
        email: userFound.email,
        role: userFound.role
    });
};

// ===============================
// OBTENER CLIENTES
// ===============================
export const getClientes = async (req, res) => {
    try {
        const clientes = await User.find().select('-password');
        res.json(clientes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al obtener clientes" });
    }
};

// ===============================
// BUSCAR CLIENTES
// ===============================
export const searchCliente = async (req, res) => {
    try {
        const { q } = req.query;

        const clientes = await User.find({
            $or: [
                { nombre: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { telefono: { $regex: q, $options: 'i' } }
            ]
        }).select('-password');

        res.json(clientes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al buscar clientes" });
    }
};
