import { useHistory } from "react-router";
import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";

const DetailHome = ( {currentTrip} ) => {

  const value = useContext(dataContext);

  const history = useHistory();

  const onDetailsClick = () => {
    value.setCurrent(currentTrip);
    history.push(`/route/${currentTrip._id}`);
  };

  const dateConvert = (date) => {
    const newDate = { month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat('en-US', newDate).format(new Date(date));
  };

  return (
    <div className="py-2 px-4 md:py-8">

      <h2 className="font-extrabold text-primary">Amount of Days</h2>
      <p>{currentTrip.days}</p>

      { currentTrip.fees ? <h2 className="font-extrabold text-primary">Fees</h2> : null }
      { currentTrip.fees ? <p>{currentTrip.fees}</p> : null }

      { currentTrip.trailType ? <h2 className="font-extrabold text-primary">Trail Type</h2> : null }
      { currentTrip.trailType ? <p>{currentTrip.trailType}</p> : null }

      { currentTrip.trailDate ? <h2 className="font-extrabold text-primary">Date of Trip</h2> : null }
      { currentTrip.trailDate ? <p>{dateConvert(currentTrip.trailDate)}</p> : null }

      <button onClick={onDetailsClick} className="w-full bg-primary my-2 hover:bg-primaryDark text-white font-bold py-2 px-4 rounded shadow-md">More Details</button>

    </div>
  );
}

export default DetailHome;
