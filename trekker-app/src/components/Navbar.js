import { useHistory } from 'react-router-dom';
import trekkerlogo from '../idea2.png'

const Navbar = () => {
  const history = useHistory();
  const handleClick = () => history.push('/create');

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div>
        <a href="/">
          <img src={trekkerlogo} alt="trekker logo" className="w-50 h-50"/>
        </a>
      </div>
      <div>
        <button onClick={handleClick} className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded">Add a trip</button>
      </div>
    </nav>
  );
}

export default Navbar;
