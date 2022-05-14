export interface response{
    ok :  boolean;
    result: User[];
    message: String;
    err: string;
    token: string;
}

export interface responseAction{
    ok: true
    result: DBresponse

}

export interface DBresponse{
    affectedRows: Number
    changedRows: Number
    fieldCount: Number
    info: string
    insertId: number
    serverStatus: number
    warningStatus: number
}

export interface User{
    id: Number;
    username: String;
    correo: String;
    telefono: number;
    estatus: number;
    perfil: string;
    password: String;
    fecha_registro: Date;
    fecha_actualizacion: Date;
    usuario_registro: number;
    affectedRows: String;
}