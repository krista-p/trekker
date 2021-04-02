import Navbar from './Navbar';
import MapCreate from './create/MapCreate';

const CreatePage = () => {

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden"> 
      <Navbar />
      <div className="flex w-screen overflow-y-auto md:overflow-hidden md:flex-1">
        <MapCreate className="flex w-full" />
      </div>
    </div>
  );
}

export default CreatePage;
