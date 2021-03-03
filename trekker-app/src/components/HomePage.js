import Navbar from './Navbar';
import ListHome from './home/ListHome';
import MapHome from './home/MapHome';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div class="flex px-8">
        <MapHome class="h-screen w-screen" />
        <ListHome class="" />
      </div>
    </div>
  );
}

export default HomePage;