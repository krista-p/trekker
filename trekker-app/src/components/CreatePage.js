import Navbar from './Navbar';
import Detail from './details/Detail';
import MapDetail from './details/MapDetail';

const CreatePage = () => {
  return (
    <div class="bg-gray-300"> 
      <Navbar />
      <h1>THIS IS THE CREATE PAGE</h1>
      <div class="flex px-8">
        <Detail class="w-1/2 h-screen" />
        <MapDetail class="w-1/2 h-screen" />
      </div>
    </div>
  );
}

export default CreatePage;