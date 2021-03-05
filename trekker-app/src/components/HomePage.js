import Navbar from './Navbar';
import ListHome from './home/ListHome';
import MapHome from './home/MapHome';

const HomePage = () => {

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex px-8 p-4">
        <MapHome className="h-full w-1/2" />
        <ListHome />
      </div>
    </div>
  );
}

export default HomePage;