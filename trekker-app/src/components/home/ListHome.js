import ListItemHome from "./ListItemHome"

const ListHome = ( {starts} ) => {
  return (
    <div className="pl-4">
      <ul>
        <li>
          {starts.map((start) => {
            return (<ListItemHome start={start} key={start._id} />)
          })
          }
        </li>
      </ul>
    </div>
  );
}

export default ListHome;
