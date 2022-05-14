const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { verifyToken } = require('../Middlewares/verifytoken');

const {loginUser, getUsers, getUserId, updUser, insUser, deleteUser} = require('../Models/userModel');

const router = express.Router();

router.route('/login')
    .post(async(req,res)=>{
        const {user, pass} = req.body;

        try{
            const userDB = await loginUser(user,pass);
            if(userDB.ok){
                if(userDB.result.length < 1) 
                    return res.status(403).json({
                        ok: false,
                        result: userDB.result,
                        message: 'Usuario y/o contraseña incorrectos'
                    })
                const token = jwt.sign(userDB.result[0],process.env.SEED,{expiresIn: 60*60*24});
                res.status(200).json({...userDB,token});
            }else{
                res.status(500).json(result);
            }

        }catch(err){
            console.log(err);
        }
    })

router.route('/users')
    .get(verifyToken,async(req,res)=>{
        try{
            const users = await getUsers();
            if(users.ok){
                if(users.result.length < 1) 
                    return res.status(404).json({
                        ok: false,
                        result: users.result[0],
                        message: 'Sin registro de usuarios'
                    })
                res.status(200).json(users);
            }else{
                res.status(500).json(users);
            }

        }catch(err){

            res.status(505).json({error:err})
            throw new Error(err);
        }
    })
    .post(verifyToken,async(req,res)=>{
        try {
            let user = req.body;

            bcrypt.hash(user.password.toString(),10,(err,hash)=>{
                if(err) return res.status(500).json({
                    ok: false,
                    result: [],
                    message: 'Error al guardar la password!'
                })
                user.password = hash;
            });

            const saved= await insUser(user);
    
            if(saved.ok){
                if(saved.result < 1)
                    return res.status(404).json({
                        ok: false,
                        result: saved.result[0],
                        message: 'Error al guardar'
                    })
                res.status(200).json(saved);
            }else{
                res.status(500).json(saved);
            }
            
        } catch (error) {
            throw new Error(error)
        }
    })

router.route('/users/:userId')
    .get(verifyToken, async(req,res)=>{
        try{
            const user = await getUserId(req.params.userId)

            if(user.ok){
                if(user.result < 1)
                    return res.status(404).json({
                        ok: false,
                        result: user.result[0],
                        message: 'Sin registro del usuario'
                    })
                res.status(200).json(user);
            }else{
                res.status(500).json(user);
            }
        }catch(err){

        }
    })
    .put(verifyToken,async(req,res)=>{
        const user = req.body;
        console.log(user);
        if(user.password !== ''){
            bcrypt.hash(user.password.toString(),10,(err,hash)=>{
                if(err) return res.status(500).json({
                    ok: false,
                    result: [],
                    message: 'Error al guardar la password!'
                })
                user.password = hash;
            })
        }

        const saved= await updUser(user,req.params.userId);

        if(saved.ok){
            if(saved.result < 1)
                return res.status(404).json({
                    ok: false,
                    result: saved.result[0],
                    message: 'Error al guardar'
                })
            res.status(200).json(saved);
        }else{
            res.status(500).json(saved);
        }
    })

router.route('/authenticate')
    .get(verifyToken,(req,res)=>{
          return  res.status(200).json({
                ok:true
            });
    })

router.route('/deleteUser/:userId')
    .get(verifyToken, async (req,res)=>{
        try{
            const userDeleted = await deleteUser(req.params.userId);

            if(userDeleted.ok){
                if(userDeleted.result < 1)
                    return res.status(404).json({
                        ok: false,
                        result: userDeleted.result[0],
                        message: 'Error al guardar'
                    })
                res.status(200).json(userDeleted);
            }else{
                res.status(500).json(userDeleted);
            }

        }catch(err){
            console.log(err);
        }
    })

module.exports = router;