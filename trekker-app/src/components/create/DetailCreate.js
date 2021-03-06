import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";


const DetailCreate = ({coordinates}) => {

  const value = useContext(dataContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { startingPoint: {
      type: 'Point',
      start: coordinates
      }
    };
    if (coordinates) {
      const post = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch('http://localhost:5000/api', post)
        .then((data) => data.json())
        .then((newStart) => {
          value.setTrips(value.trips.concat(newStart));
        });
    }
  };

  return (
    <div className=" flex-col w-1/2 p-4">

      <form onSubmit={handleSubmit} >

        <div className="p-4" id="geocoder">
          <label className="p-4">Starting Point (Double click to get location)</label>
          <div className="border-2 border-primary bg-white">{JSON.stringify(coordinates)}</div>
        </div>

        <div className="p-4">
          <label className="p-4">Ending Point</label><input type="text" className="border-2 border-primary"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Amount of Days</label><input type="number" className="border-2 border-primary"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Fees Associated</label><input type="text" className="border-2 border-primary"></input>
        </div>

        <div className="p-4">
          <label className="p-4">Trail Type</label>
          <select className="border-2 border-primary">
            <option value="On Trail">On Trail</option>
            <option value="Off Trail">Off Trail</option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>

        <div className="p-4">
          <label className="p-4">Time of Year</label><input type="month" className="border-2 border-primary"></input>
        </div>
        
        <button type="submit" className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded">Submit</button>

      </form>
      
    </div>
  );
}

export default DetailCreate;
