const {pool} = require('../Config/db');
const {GETUSERTABLE, QUERYLOGIN, GETUSERID, UPDUSER, INSUSER, UPDPASS, DELETEUSER} = require('../Config/querys')

const loginUser = async(user,pass)=>{
    const res = await pool.execute(QUERYLOGIN,[user,pass]).then(rows=>{
       return {
           ok: true,
           result: rows[0],
           error: undefined
       };
   }).catch(err=>{
       return {
           ok: false,
           error: err.sqlMessage,
           result:[]
       }
   });

   return res;
}

const getUsers = async()=>{
    const res = await pool.query(GETUSERTABLE,[]).then((rows)=>{
        return {
            ok: true,
            result: rows[0],
            error: undefined
        };
    }).catch(err=>{
        return {
            ok: false,
            error: err.sqlMessage,
            result:[]
        }
    });

    return res;
}

const getUserId = async(userId)=>{
    const res = await pool.execute(GETUSERID,[userId]).then(rows=>{
        return {
            ok: true,
            result: rows[0],
            error: undefined
        };
    }).catch(err=>{
        return {
            ok: false,
            error: err.sqlMessage,
            result:[]
        }
    });
 
    return res;
}

const insUser =  async(user)=>{
    const dateToday = new Date().toISOString().slice(0,19).replace('T',' ');
    const res =  await pool.execute(INSUSER,
        [user.username,user.password,user.correo,user.telefono,dateToday,1,1])
        .then(rows=>{
            return {
                ok: true,
                result: rows[0],
                error: undefined
            };
        }).catch(err=>{
            console.log(err);
            return {
                ok: false,
                error: err.sqlMessage,
                result:[]
            }
        })

    return res;
}

const updPass = async(newpass, userId)=>{
    const res = await pool.execute(UPDPASS, [newpass, userId])
                    .then(rows=>{
                        return {
                            ok: true,
                            result: rows[0]
                        }
                    }).catch(err=>{
                        return {
                            ok: false,
                            result: [],
                            error: err
                        }
                    });
    return res;
}

const updUser = async(user, userId)=>{
    const dateToday = new Date().toISOString().slice(0,19).replace('T',' ');
    if(user.password !== ''){
        const password = await updPass(user.password, userId);
        console.log('password',password);
    }
    const res = await pool.execute(UPDUSER,
        [user.correo,user.telefono,dateToday,userId])
        .then(rows=>{
            return {
                ok: true,
                result: rows[0],
                error: undefined
            };
        }).catch(err=>{
            console.log(err);
            return {
                ok: false,
                error: err.sqlMessage,
                result:[]
            }
        })

        return res;
}

const deleteUser = async(userId)=>{
    const res = await pool.execute(DELETEUSER,[userId])
    .then(rows=>{
        return {
            ok: true,
            result: rows[0],
            error: undefined
        };
    }).catch(err=>{
        console.log(err);
        return {
            ok: false,
            error: err.sqlMessage,
            result:[]
        }
    })

    return res;
}



module.exports = {
    loginUser,
    getUsers,
    getUserId,
    insUser,
    updUser,
    deleteUser
}