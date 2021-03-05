import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";


const DetailCreate = () => {

  // need to create a post request with the new coordinates on the submit click button
  //console.log(start)
  const value = useContext(dataContext);

  return (
    <div className=" flex-col w-1/2 p-4">

      <form onSubmit={value.handleSubmit} >

        <div className="p-4" id="geocoder">
          <label className="p-4">Starting Point (Double click to get location)</label>
          <div className="border-2 border-green-500 bg-white">{JSON.stringify(value.start)}</div>
        </div>

        <div className="p-4">
          <label className="p-4">Ending Point</label><input type="text" className="border-2 border-green-500"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Amount of Days</label><input type="number" className="border-2 border-green-500"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Fees Associated</label><input type="text" className="border-2 border-green-500"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Trail Type</label>
          <select className="border-2 border-green-500">
            <option value="On Trail">On Trail</option>
            <option value="Off Trail">Off Trail</option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>

        <div className="p-4">
          <label className="p-4">Time of Year</label><input type="month" className="border-2 border-green-500"></input>
        </div>
        
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Submit</button>

      </form>
      
    </div>
  );
}

export default DetailCreate;
