import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";


const Detail = ({}) => {

  const value = useContext(dataContext);

  return (
    <div className=" flex-col w-1/2 p-4 overflow-auto text-center">

      <div className="p-2" id="geocoder">
        <label className="font-extrabold text-primary text-lg">Starting Point</label>
        <div className="border-2 border-primary bg-white">working on it</div>
      </div>

      <div className="p-2">
        <label className="font-extrabold text-primary">Campsites</label>
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Amount of Days</label>
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Fees Associated</label>
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Trail Type</label>
      </div>

      <div className="p-4">
        <label className="p-4 font-extrabold text-primary">Time of Year</label>
      </div>
      
    </div>
  );
}

export default Detail;
