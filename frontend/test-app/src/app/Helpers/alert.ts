import Swal, { SweetAlertIcon } from 'sweetalert2';

const fireAlert = (type:SweetAlertIcon, message:string, title:string)=>{
    Swal.fire({
        title,
        text: message,
        icon: type,
        confirmButtonText: 'Ok'
    })
}

const confirmAlert = ( message:string, title:string,optionTrue:string, optionFalse:string)=>{
    return Swal.fire({
        title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: optionTrue,
        cancelButtonText: optionFalse
    })
}

export {fireAlert,confirmAlert};