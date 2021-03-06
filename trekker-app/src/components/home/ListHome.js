import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext";
import ListItemHome from "./ListItemHome"

const ListHome = ( ) => {

  const value = useContext(dataContext);

  const clicker = () => {
    console.log('click!')
  }

  return (
    <div className="pl-4">
      <ul>
        <li onClick={clicker}>
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
