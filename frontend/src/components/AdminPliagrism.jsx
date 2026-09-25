import axiosClient from "../utils/axiosClient"
import { useEffect } from "react"
function AdminPliagrism(){

  const[reports,setreports]=useState([]);
  const [loading,setloading]=useState(false);
  const [checking,setchecking]=useState(false);
 
    const fetchreports=async()=>{
    try{
   setloading(true);

   const response=await axiosClient.post("/pliagiarism/check-all");

   console.log(response.data);

   alert(`check completed.
    accepeted submissions${response.data.totalAcceptsubmissions}
    pairs checked:${response.data.checkedPairs}
    suspicious:${response.data.suspiciousPairs}`
    
  )


    }
    catch(error){
      setloading(false);
  console.log(error);
    }
    
  }

  

  return (
    <>
    <div className="p-6">
     <div className=" flex jusitfy-between items-centre mb-6">
      <h1 className="text-2xl font-bold">  plagiarism detection</h1>

      <button onClick={fetchreports} disabled={checking}></button>

     </div>
    </div>

    </>
  )
}

export default AdminPliagrism;