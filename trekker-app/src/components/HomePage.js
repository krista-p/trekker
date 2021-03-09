import Navbar from './Navbar';
import MapHome from './home/MapHome';

const HomePage = () => {

  return (
    <div className="flex flex-col h-screen w-screen md:overflow-hidden">
      <Navbar />
      <div className="flex h-full w-screen md:overflow-hidden md:flex-1">
        <MapHome className="flex w-full" />
      </div>
    </div>
  );
}

export default HomePage;