import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const errorMessage = (message)=>{
    toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}
