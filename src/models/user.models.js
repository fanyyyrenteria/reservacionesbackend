import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim:true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    },
    telefono: {
        type: String,
        trim: true
    },
    
}, {
    timestamps: true
});


export default mongoose.model('User',userSchema);