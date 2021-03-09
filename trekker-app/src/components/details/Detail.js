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
        <label className="font-extrabold text-primary text-lg">Starting Point</label>
        <p className="border-2 border-primary object-fill bg-white">{`[${value.current.startingPoint.start[0]}, ${value.current.startingPoint.start[1]}]`}</p>
      </div>

      <div className="p-2">
        <label className="font-extrabold text-primary">Campsites</label>
        <h1>TEST: {value.current._id}</h1>
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Amount of Days</label>
        {value.current.days ? <p>{value.current.days}</p> : null}
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Fees Associated</label>
        {value.current.fees ? <p>{value.current.fees}</p> : null}
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Trail Type</label>
        {value.current.trailType ? <p>{value.current.trailType}</p> : null}
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Time of Year</label>
        {value.current.trailDate ? <p>{dateConvert(value.current.trailDate)}</p> : null}
      </div>

      <div className="p-2">
        <label className="p-2 font-extrabold text-primary">Description</label>
        {value.current.description ? <p>{value.current.description}</p> : null}
      </div>
      
    </div>
  );
}

export default Detail;
