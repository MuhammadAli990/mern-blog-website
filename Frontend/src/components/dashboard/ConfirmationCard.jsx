import { successMessage } from "../toasts/SuccessToast";
import { errorMessage } from "../toasts/ErrorToast";

function ConfirmationCard(props) {
    const {showConfirmCard,setShowConfirmCard,blogId,setRefresh} = props;

    const handleDeleteButton = async()=>{
        setShowConfirmCard(false);
        const res = await fetch('http://127.0.0.1:3000/deleteBlog',{
            method:"DELETE",
            body:JSON.stringify({blogId}),
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const result = await res.json();
        if(result.success){
            successMessage(result.message);
            setRefresh(true);
        }
        else{
            errorMessage(result.message);
        }
    }
  return (
    <div className={`${showConfirmCard?"flex":"hidden"} fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50`}>
        <div className="bg-white shadow-lg p-6 w-96 rounded-md flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this blog?</h3>
            <p className="mb-2">This action cannot be undone.</p>
            <div className="flex justify-end">
                <button onClick={()=>setShowConfirmCard(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
                <button onClick={handleDeleteButton} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationCard
