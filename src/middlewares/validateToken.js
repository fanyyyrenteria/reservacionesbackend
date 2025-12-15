import {TOKEN_SECRET} from '../config.js'
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;
    if(!token) //si no hay token en las cookies
    return res.status(401).json({message: "No token, autorizacion denegada"});

    //Verificamos token
    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err) 
            return res.status(403).json({message: 'Token invalido'});
        
        req.user = user; 
        next();
    })
    
}