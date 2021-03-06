# Trekker

For my senior portion of Codeworks, I was tasked with creating a web application in 7 days.
### Enter Trekker!
Trekker is a community based website in which users can draw out routes for backpacking trips that they have completed. Users can then search the location and find options for backpacking routes that may not be as popular!

**Landing Page:** users can search locations within the map and get more details about a trip.
![Landing Page for Trekker](./screenshots/landingpage.png "Trekker Landing Page")

**Landing Page with Details**
![Landing Page Detail](./screenshots/landingdetail.png "Trekker Landing Page with Details")

**Trip Detail Page** 
![Route Page](./screenshots/routedetail.png "Route Detail Page")

**Create a Trip:** If a user wants to log a new route, they can press the "Add A Trip" button, and are redirected to the create page.
![Create Page](./screenshots/createroute.png "Trekker Create Trip Page")

**Draw a Route:** Users can start their route by double clicking on the map to show the starting location marker. Then the user can use the map tools to draw lines for their route. The points are used for locating campsites along their routes. The user can also add important information related to their routes.
![Create Page for Trekker](./screenshots/drawroute.png "Trekker Create Route")

### Trekker Video
[![Trekker Video](http://img.youtube.com/vi/3yGpr5h5eoc/0.jpg)](http://www.youtube.com/watch?v=3yGpr5h5eoc "Trekker Video")

## Getting Started

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/krista-p/trekker.git
   cd trekker
   ```

2. Install dependencies.

   ```bash
   npm install
   cd backend			# ! Change into the backend folder !
   npm install
   cd ..
   cd trekker-app			# ! Change into the trekker-app folder !
   npm install
   ```

3. Create .env files based off of the envexample files in both the server and trekker-app folders.

4. While in the backend folder, run ````nodemon index.js```` to start the server and database connection.

5. While in the trekker-app folder, run ````npm run start```` to start the script for running the application locally.

## Tech Stack

### Frontend
* [React](https://reactjs.org/)
* [Mapbox](https://docs.mapbox.com/)
* [MapboxGL-Geocoder](https://github.com/mapbox/mapbox-gl-geocoder)
* [MapboxGL-Draw](https://github.com/mapbox/mapbox-gl-draw/)
* [TailwindCSS](https://tailwindcss.com/)

### Backend
* [Express](https://expressjs.com/)
* [MongoDB](https://docs.mongodb.com/)
* [MongooseJS](https://mongoosejs.com/docs/guide.html)