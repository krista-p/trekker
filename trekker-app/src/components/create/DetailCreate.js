import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { dataContext } from "../../contexts/dataContext";


const DetailCreate = ( { coordinates, route, camps } ) => {

  const [days, setDays] = useState('');
  const [fees, setFees] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const value = useContext(dataContext);
  const history = useHistory();

  // on submit button, add data to db, need to add error handling
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { 
      startingPoint: { start: coordinates },
      tripRoute: { points: route },
      campsites: { spots: camps },
      days: days,
      fees: fees,
      trailType: type,
      trailDate: date,
      description: description
    };
    if (!days) alert('Please input amount of days before submitting!');
    if (coordinates.length === 0) alert('Please add starting point before submitting!');
    if (route.length === 0) alert('Please add route before submitting!');
    if (coordinates.length > 0 && route.length > 0 && days) {
      const post = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      await fetch('http://localhost:5000/api', post)
        .then((data) => data.json())
        .then((newTrip) => {
          value.setTrips(value.trips.concat(newTrip));
        });
      history.push('/');
      history.go();
    }
  };

  // handling the input changes
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
    <div className="flex flex-col overflow-y-auto p-4 py-0 m-2 text-center md:flex-1">

      <h1 className="text-primary font-extrabold text-xl w-full">Create a trip!</h1>
      <form onSubmit={handleSubmit} >

        <div className="p-2" id="geocoder">
          <h2 className="font-extrabold text-primary">Starting Point</h2>
          <p className="text-xs">Double click on map to get starting location.</p>
          <p className="text-xs pb-2">GPS coordinates will appear below.</p>
          {coordinates[0] !== undefined ? 
            <p className="border-2 border-primary object-fill bg-white text-sm">{`[${coordinates[1]}, ${coordinates[0]}]`}</p> : 
            <p className="border-2 border-primary object-fill bg-white text-sm"></p> }
        </div>

        <div>
          <h2 className="font-extrabold text-primary">Route</h2>
          <p className="text-xs">Use the line tool on the map to draw your route. Please only use one continuous segment to map the route.</p>
        </div>

        <div>
          <h2 className="font-extrabold text-primary">Campsites</h2>
          <p className="text-xs">Use the point tool on the map to mark your campsite location(s)</p>
        </div>

        <div className="p-2">
          <h2 className="p-2 font-extrabold text-primary">Amount of Days</h2>
          <input type="number" value={days} onChange={handleDaysChange} className="border-2 border-primary w-1/6"></input>
        </div>

        <div className="p-2">
          <h2 className="font-extrabold text-primary">Fees Associated</h2>
          <textarea type="text" value={fees} onChange={handleFeesChange} className="border-2 border-primary w-full resize-none" rows='2'></textarea>
        </div>

        <div className="p-2">
          <h2 className="p-2 font-extrabold text-primary">Trail Type</h2>
          <select name='type' onChange={handleTypeChange} className="border-2 border-primary">
            <option value=''>Choose one</option>
            <option value="On Trail">On Trail</option>
            <option value="Off Trail">Off Trail</option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>

        <div className="p-2">
          <h2 className="p-2 font-extrabold text-primary">Time of Year</h2>
          <input type="month" value={date} onChange={handleDateChange} className="border-2 border-primary w-1/2"></input>
        </div>

        <div className="p-2">
          <h1 className="font-extrabold text-primary">Description</h1>
          <textarea type="text" value={description} onChange={handleDescriptionChange} className="border-2 border-primary w-full resize-none" rows='5'></textarea>
        </div>
        
        <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded md:sticky md:bottom-0 shadow-md">Submit</button>

      </form>
      
    </div>
  );
}

export default DetailCreate;
