import { useHistory } from 'react-router-dom';
import trekkerlogo from '../trekkerLogo.png'

const Navbar = () => {
  const history = useHistory();
  const handleClick = () => {
    history.location.pathname === '/' ? history.push('/create') : history.push('/');
  };

  if (history.location.pathname === '/') {
    return (
      <nav className="font-sans flex flex-col justify-between w-full py-2 px-6 bg-white shadow-md md:flex-row md:items-center">
          <a href="/">
            <img src={trekkerlogo} alt="trekker logo" className="m-auto" />
          </a>
          <button onClick={handleClick} className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded shadow-md">Add a trip</button>
      </nav>
    );
  }
  return (
    <nav className="font-sans flex flex-col justify-between w-full py-2 px-6 bg-white shadow-md md:flex-row md:items-center">
        <a href="/">
          <img src={trekkerlogo} alt="trekker logo" className="m-auto" />
        </a>
        <button onClick={handleClick} className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded shadow-md">Back</button>
    </nav>
  );
}

export default Navbar;
