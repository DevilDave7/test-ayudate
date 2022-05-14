const GETUSERTABLE = 
    `SELECT u.id,u.correo, p.nombre as perfil, u.telefono 
    FROM usuarios u 
    INNER JOIN perfiles p ON u.perfil_id = p.id 
    WHERE u.estatus = 1`;

const GETUSERID = 
    `SELECT 
            id,
            username,
            perfil_id,
            correo,
            telefono,
            estatus,
            fecha_creacion as fecha_registro,
            fecha_actualizacion,
            usuario_id_creacion as usuario_registro
    FROM usuarios 
    WHERE id = ? AND estatus = 1`

const INSUSER =
'INSERT INTO `usuarios` (`username`,`password`,`correo`,`telefono`, `fecha_creacion`, `estatus`,`perfil_id`)' +
'values (?,?,?,?,?,?,?)';

const UPDUSER = 
    'UPDATE `usuarios` SET `correo` = ?,`telefono` = ?,`fecha_actualizacion` = ? WHERE id= ?'

const UPDPASS = 
    'UPDATE `usuarios` SET `password` = ? WHERE `id` = ?  '

const QUERYLOGIN = 
    "SELECT username FROM `usuarios` WHERE `username` = ? AND `password` = ?";

const DELETEUSER =
    "UPDATE `usuarios` SET `estatus` = 0 WHERE `id` = ?"


module.exports = {
    GETUSERTABLE,
    QUERYLOGIN,
    GETUSERID,
    INSUSER,
    UPDUSER,
    UPDPASS,
    DELETEUSER
}
