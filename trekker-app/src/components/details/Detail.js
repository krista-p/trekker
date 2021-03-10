import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";


const Detail = () => {

  const value = useContext(dataContext);

  const dateConvert = (date) => {
    const newDate = { month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat('en-US', newDate).format(new Date(date));
  };

  return (
    <div className="flex flex-col overflow-y-auto p-4 py-0 m-2 text-center md:flex-1">

      <div className="p-2">
        <h2 className="font-extrabold text-primary text-lg">Starting Point</h2>
        <p className="border-2 border-primary object-fill bg-white">{`[${value.current.startingPoint.start[1]}, ${value.current.startingPoint.start[0]}]`}</p>
      </div>

      <div className="p-2">
        <h2 className="font-extrabold text-primary text-lg">Ending Point</h2>
        <p className="border-2 border-primary object-fill bg-white">{
          `[${value.current.tripRoute.points[value.current.tripRoute.points.length - 1][1]}, 
          ${value.current.tripRoute.points[value.current.tripRoute.points.length - 1][0]}]`
        }</p>
      </div>

      <div className="p-2 flex flex-row justify-center">
        <h2 className="pr-4 font-extrabold text-primary">Amount of Days</h2>
        <p>{value.current.days}</p>
      </div>

      <div className="p-2">
        <h2 className="p-2 font-extrabold text-primary">Fees Associated</h2>
        {value.current.fees ? <p className="break-all">{value.current.fees}</p> : null}
      </div>

      <div className="flex flex-row justify-center">
        <div className="p-2">
          <h2 className="font-extrabold text-primary">Trail Type</h2>
          {value.current.trailType ? <p>{value.current.trailType}</p> : null}
        </div>

        <div className="p-2">
          <h2 className="font-extrabold text-primary">Time of Year</h2>
          {value.current.trailDate ? <p>{dateConvert(value.current.trailDate)}</p> : null}
        </div>
      </div>

      <div className="p-2">
        <h2 className="p-2 font-extrabold text-primary">Description</h2>
        {value.current.description ? <p className="break-all">{value.current.description}</p> : null}
      </div>
      
    </div>
  );
}

export default Detail;
