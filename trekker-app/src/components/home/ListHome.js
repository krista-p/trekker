import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";
import ListItemHome from "./ListItemHome"

const ListHome = ( ) => {

  const value = useContext(dataContext);

  return (
    <div className="overflow-auto text-center">
      <h1>Click on a trip for more details!!</h1>
      <ul>
        <li>
          {value.trips.map((trip) => {
            return (<ListItemHome trip={trip} key={trip._id} />)
          })
          }
        </li>
      </ul>
    </div>
  );
}

export default ListHome;
