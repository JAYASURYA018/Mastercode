import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastrmsg =
{
    toastMessage: function (message: any, type: string, title?: string, options?: any) {
        let toasterOptions = {
            position: "top-right",
            autoClose: 5000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,    
            draggable: true,
            progress: undefined,
        }
        options = options == undefined ? toasterOptions : options
        type = type == undefined ? 'success' : type

        if (type == 'success')
            toast.success(message, options);
        else if (type == 'error')
            toast.error(message, options);
        else if (type == 'info')
            toast.info(message, options);
        else if (type == 'warning')
            toast.warning(message, options);
        return (
            <ToastContainer />
        );
    }

}
export default toastrmsg;