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
    <div className=" flex-col w-1/2 p-4 overflow-auto text-center">

      <form onSubmit={handleSubmit} >

        <div className="p-2" id="geocoder">
          <label className="font-extrabold text-primary text-lg">Starting Point</label>
          <p className="text-xs pb-2">Double click on map to get starting location</p>
          <div className="border-2 border-primary bg-white">{JSON.stringify(coordinates)}</div>
        </div>

        <div className="p-2">
          <label className="font-extrabold text-primary">Route</label>
          <p className="text-xs">Use the line tool on the map to draw your route. Please only use one continuous segment to map the route.</p>
        </div>

        <div className="p-2">
          <label className="font-extrabold text-primary">Campsites</label>
          <p className="text-xs">Use the point tool on the map to mark your campsite location(s)</p>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Amount of Days</label><
            input type="number" className="border-2 border-primary"></input>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Fees Associated</label>
          <input type="text" className="border-2 border-primary"></input>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Trail Type</label>
          <select className="border-2 border-primary">
            <option value="On Trail">On Trail</option>
            <option value="Off Trail">Off Trail</option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>

        <div className="p-4">
          <label className="p-4 font-extrabold text-primary">Time of Year</label><input type="month" className="border-2 border-primary"></input>
        </div>
        
        <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded">Submit</button>

      </form>
      
    </div>
  );
}

export default DetailCreate;
