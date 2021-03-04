
const DetailCreate = () => {
  return (
    <div className=" flex-col w-1/2 p-4">

      <div className="p-4">
        <label className="p-4">Starting Point</label><input type="text" className="border-2 border-green-500"></input>
      </div>

      <div className="p-4">
        <label className="p-4">Ending Point</label><input type="text" className="border-2 border-green-500"></input>
      </div>

      <div className="p-4">
        <label className="p-4">Amount of Days</label><input type="number" className="border-2 border-green-500"></input>
      </div>

      <div className="p-4">
        <label className="p-4">Fees Associated</label><input type="text" className="border-2 border-green-500"></input>
      </div>

      <div className="p-4">
        <label className="p-4">Trail Type</label>
        <select className="border-2 border-green-500">
          <option value="On Trail">On Trail</option>
          <option value="Off Trail">Off Trail</option>
          <option value="Mix of Both">Mix of Both</option>
        </select>
      </div>

      <div className="p-4">
        <label className="p-4">Time of Year</label><input type="month" className="border-2 border-green-500"></input>
      </div>
      
    </div>
  );
}

export default DetailCreate;
