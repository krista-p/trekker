import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { dataContext } from "../../contexts/dataContext";


const DetailCreate = ( { coordinates, route } ) => {

  const [days, setDays] = useState('');
  const [fees, setFees] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const value = useContext(dataContext);
  const history = useHistory();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      startingPoint: { start: coordinates },
      tripRoute: { points: route },
      //campsites: { spots: camps },
      days: days,
      fees: fees,
      trailType: type,
      trailDate: date
    };
    if (coordinates) {
      const post = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      await fetch('http://localhost:5000/api', post)
        .then((data) => data.json())
        .then((newStart) => {
          value.setTrips(value.trips.concat(newStart));
        });
        history.push('/');
    }
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };
  const handleFeesChange = (event) => {
    setFees(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className=" flex-col w-1/2 p-4 py-0 overflow-auto text-center">

      <form onSubmit={handleSubmit} >

        <div className="p-2" id="geocoder">
          <label className="font-extrabold text-primary">Starting Point</label>
          <p className="text-xs">Double click on map to get starting location.</p>
          <p className="text-xs pb-2">GPS coordinates will appear below.</p>
          <div className="border-2 border-primary bg-white text-sm">{JSON.stringify(coordinates)}</div>
        </div>

        <div>
          <label className="font-extrabold text-primary">Route</label>
          <p className="text-xs">Use the line tool on the map to draw your route. Please only use one continuous segment to map the route.</p>
        </div>

        <div>
          <label className="font-extrabold text-primary">Campsites</label>
          <p className="text-xs">Use the point tool on the map to mark your campsite location(s)</p>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Amount of Days</label>
          <input type="number" value={days} onChange={handleDaysChange} className="border-2 border-primary w-1/6"></input>
        </div>

        <div className="p-2">
          <label className="font-extrabold text-primary">Fees Associated</label>
          <textarea type="text" value={fees} onChange={handleFeesChange} className="border-2 border-primary w-full resize-none" rows='2'></textarea>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Trail Type</label>
          <select value={type} onChange={handleTypeChange} className="border-2 border-primary" name="type">
            <option value="On Trail">On Trail</option>
            <option value="Off Trail">Off Trail</option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>

        <div className="p-2">
          <label className="p-2 font-extrabold text-primary">Time of Year</label>
          <input type="month" value={date} onChange={handleDateChange} className="border-2 border-primary w-1/2"></input>
        </div>

        <div className="p-2">
          <h1 className="font-extrabold text-primary">Description</h1>
          <textarea type="text" value={description} onChange={handleDescriptionChange} className="border-2 border-primary w-full resize-none" rows='5'></textarea>
        </div>
        
        <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded sticky bottom-0 shadow-md">Submit</button>

      </form>
      
    </div>
  );
}

export default DetailCreate;
