import Navbar from './Navbar';
import MapCreate from './create/MapCreate';

const CreatePage = () => {

  return (
    <div className="h-screen w-screen"> 
      <Navbar />
      <div className="flex h-5/6 w-screen">
        <MapCreate className="h-full w-full" />
      </div>
    </div>
  );
}

export default CreatePage;