import Navbar from './Navbar';
import MapCreate from './create/MapCreate';

const CreatePage = ({starts, start, handleStartChange, handleSubmit}) => {
  return (
    <div className="bg-gray-300"> 
      <Navbar />
      <h1>THIS IS THE CREATE PAGE</h1>
      <div className="flex px-8 p-4">
        <MapCreate starts={starts} start={start} handleStartChange={handleStartChange} handleSubmit={handleSubmit} className="w-screen h-screen" />
      </div>
    </div>
  );
}

export default CreatePage;