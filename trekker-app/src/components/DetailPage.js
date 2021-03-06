import Navbar from './Navbar';
import MapDetail from './details/MapDetail';

function DetailPage() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex h-5/6 w-screen">
        <MapDetail className="h-full w-full" />
      </div>
    </div>
  );
}

export default DetailPage;