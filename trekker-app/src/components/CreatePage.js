import Navbar from './Navbar';
import MapCreate from './create/MapCreate';

const CreatePage = () => {

  return (
    <div className="bg-gray-300"> 
      <Navbar />
      <h1>THIS IS THE CREATE PAGE</h1>
      <div className="flex px-8 p-4">
        <MapCreate className="w-screen h-screen" />
      </div>
    </div>
  );
}

export default CreatePage;