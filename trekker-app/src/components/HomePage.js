import Navbar from './Navbar';
import ListHome from './home/ListHome';
import MapHome from './home/MapHome';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [starts, setStarts] = useState([]);

  // fetch all of the starting points from the db
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((data) => data.json())
      .then((db) => {
        setStarts(db.data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div class="flex px-8">
        <MapHome starts={starts} class="h-screen w-screen" />
        <ListHome starts={starts} class="" />
      </div>
    </div>
  );
}

export default HomePage;