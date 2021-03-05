
const ListItemHome = ( {trip} ) => {

  return (
    <div className="p-4 border-2 border-gray-300">
      <p>{trip.location.start}</p>
    </div>
  );
}

export default ListItemHome;