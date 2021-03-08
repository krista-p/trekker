import ListItemHome from "./ListItemHome"

const ListHome = ( {currentTrip} ) => {

  if (currentTrip._id) {
    return (
      <div className="p-4 overflow-auto text-center">
        <h1 className="bg-primary text-white font-bold">Click on a point for more details!</h1>
        <ListItemHome currentTrip={currentTrip} />
      </div>
    );
  }
  return (
    <div className="p-4 overflow-auto text-center">
      <h1>Click on a point on the map for more details!</h1>
    </div>
  )
}

export default ListHome;