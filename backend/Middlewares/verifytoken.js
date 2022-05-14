var jwt = require('jsonwebtoken');

let  verifyToken = (req, res, next) =>{
    let token = req.get('Authorization');
    jwt.verify(token,process.env.SEED,(err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                message: 'No esta autorizado!'
            });
        }
        next();
    })
}


module.exports = {
    verifyToken
}