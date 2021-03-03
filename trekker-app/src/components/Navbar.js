import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const handleClick = () => history.push('/create');

  return (
    <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0">
        <a href="/" class="text-2xl no-underline text-green-700">trekker</a>
      </div>
      <div>
        <button onClick={handleClick} class="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Add a trip</button>
      </div>
    </nav>
  );
}

export default Navbar;
