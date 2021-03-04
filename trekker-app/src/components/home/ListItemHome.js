
const ListItemHome = ( {start} ) => {
  console.log(start)
  return (
    <div className="p-4 border-2 border-gray-300">
      <p>{start.location.formattedAddress}</p>
    </div>
  );
}

export default ListItemHome;