import Navbar from './Navbar';
import ListHome from './home/ListHome';
import MapHome from './home/MapHome';

const HomePage = ({starts, start}) => {

  return (
    <div>
      <Navbar />
      <div className="flex px-8 p-4">
        <MapHome starts={starts} start={start} className="h-screen w-screen" />
        <ListHome starts={starts} start={start} className="w-200" />
      </div>
    </div>
  );
}

export default HomePage;