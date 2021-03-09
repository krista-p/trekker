import Navbar from './Navbar';
import MapDetail from './details/MapDetail';

function DetailPage() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="flex w-screen overflow-y-auto md:overflow-hidden md:flex-1">
        <MapDetail className="flex w-full" />
      </div>
    </div>
  );
}

export default DetailPage;