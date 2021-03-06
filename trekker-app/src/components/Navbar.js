import { useHistory } from 'react-router-dom';
import trekkerlogo from '../trekkerLogo.png'

const Navbar = () => {
  const history = useHistory();
  const handleClick = () => history.push('/create');

  return (
    <nav className="font-sans flex flex-col justify-between sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow-lg sm:items-baseline w-full">
        <a href="/">
          <img src={trekkerlogo} alt="trekker logo" className="m-auto" />
        </a>
        <button onClick={handleClick} className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded m-auto mr-0">Add a trip</button>
    </nav>
  );
}

export default Navbar;
