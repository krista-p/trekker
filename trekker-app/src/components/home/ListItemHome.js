
const ListItemHome = ( {trip} ) => {

  return (
    <div className="p-4 border-2 border-primaryDark">
      <p>{trip.startingPoint.start}</p>
    </div>
  );
}

export default ListItemHome;