import { useHistory } from "react-router";
import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";

const ListItemHome = ( {currentTrip} ) => {

  const value = useContext(dataContext);

  const history = useHistory();

  const onDetailsClick = () => {
    value.setCurrent(currentTrip);
    history.push(`/route/${currentTrip._id}`);
  };

  return (
    <div className="p-12">
      <p>{currentTrip._id}</p>
      <h2 className="p-2 font-extrabold text-primary">Amount of Days</h2>
      <p>{currentTrip.days}</p>
      { currentTrip.fees ? <h1 className="p-2 font-extrabold text-primary">Fees</h1> : null }
      { currentTrip.fees ? <p>{currentTrip.fees}</p> : null }
      { currentTrip.trailType ? <h1 className="p-2 font-extrabold text-primary">Trail Type</h1> : null }
      { currentTrip.trailType ? <p>{currentTrip.trailType}</p> : null }
      { currentTrip.trailDate ? <h1 className="p-2 font-extrabold text-primary">Date of Trip</h1> : null }
      { currentTrip.trailDate ? <p>{currentTrip.trailDate}</p> : null }
      <button onClick={onDetailsClick} className="w-full bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded shadow-md">More Details</button>
    </div>
  );
}

export default ListItemHome;