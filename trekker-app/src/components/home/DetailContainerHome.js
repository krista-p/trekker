import DetailHome from "./DetailHome"

const DetailContainerHome = ( {currentTrip} ) => {

  if (currentTrip._id) {
    return (
      <div className="flex flex-col overflow-y-auto p-4 text-center md:flex-1">
        <h1 className="text-primary font-bold text-xl w-full border-b-2">Click on a point for more details!</h1>
        <DetailHome currentTrip={currentTrip} />
      </div>
    );
  }
  return (
    <div className="flex flex-col overflow-y-auto p-4 text-center md:flex-1">
      <h1 className="text-primary font-bold text-xl w-full border-b-2">Click on a point for more details!</h1>
    </div>
  )
}

export default DetailContainerHome;
