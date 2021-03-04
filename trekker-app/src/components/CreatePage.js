import Navbar from './Navbar';
import MapCreate from './create/MapCreate';
import DetailCreate from './create/DetailCreate';

const CreatePage = () => {
  return (
    <div className="bg-gray-300"> 
      <Navbar />
      <h1>THIS IS THE CREATE PAGE</h1>
      <div className="flex px-8 p-4">
        <DetailCreate className="w-1/2 h-screen" />
        <MapCreate className="w-1/2 h-screen" />
      </div>
    </div>
  );
}

export default CreatePage;