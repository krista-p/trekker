import Navbar from './Navbar';
import ListHome from './home/ListHome';
import MapHome from './home/MapHome';

const HomePage = () => {

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex h-5/6 w-screen">
        <MapHome className="h-full w-3/4" />
      </div>
    </div>
  );
}

export default HomePage;