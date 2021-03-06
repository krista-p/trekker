import { useHistory } from "react-router";

const ListItemHome = ( {trip} ) => {

  const history = useHistory();
  const clicker = () => {
    history.push(`/route/${trip._id}`)
  }

  return (
    <div className="p-4 bg-gray-200" onClick={clicker}>
      <p>{trip.startingPoint.start}</p>
    </div>
  );
}

export default ListItemHome;