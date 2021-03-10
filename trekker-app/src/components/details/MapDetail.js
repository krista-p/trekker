import React, { useRef, useEffect, useContext } from 'react';
import { dataContext } from "../../contexts/dataContext";
import mapboxgl from 'mapbox-gl';
import Detail from './Detail';

// this token is scoped only for read, so it is okay for clients to see it
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2w5a29wdHgyMmtoMnZwZWhxM3B4Z3ZoIn0.zZQDeayZw6F5zcnkXi3pMw';

const MapDetail = () => {

  const value = useContext(dataContext);

  const mapContainerRef = useRef(null);
  
  // initialize map when component mounts
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/kristapolikaitis/ckl9ksjpg0l6h17n27r0wkhhz',
      center: value.current.startingPoint.start,
      zoom: 5,
    });
    
    map.on('load', () => {

      // add the source of the starting point
      map.addSource('startingPoint', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 1,
              geometry: {
                id: value.current._id,
                type: 'Point',
                coordinates: value.current.startingPoint.start
              }
            }
          ],
        }
      });
      
      // create layer for the starting point
      map.addLayer({
        id: 'point',
        type: 'symbol',
        source: 'startingPoint',
        layout: {
          "icon-image": "start",
          "icon-anchor": 'bottom',
          'icon-allow-overlap': true
        },
      });

      // add the source of the route locations
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 2,
              geometry: {
                id: value.current._id,
                type: 'LineString',
                coordinates: value.current.tripRoute.points
              }
            }
          ],
        }
      });

      // create layer for the line
      map.addLayer({
        id: 'line',
        type: 'line',
        source: 'route',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'magenta',
          'line-width': 2,
          'line-opacity': .5
        }
      });

      // create layer for the arrows on the route
      map.addLayer({
        id: 'arrow',
        type: 'symbol',
        source: 'route',
        layout: {
          "icon-image": 'arrow',
          "symbol-placement": 'line',
          'icon-rotate': 180
        },
        paint: {}
      });
      
      // create source for the campsites
      map.addSource('campPoints', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 3,
              geometry: {
                id: value.current._id,
                type: 'MultiPoint',
                coordinates: value.current.campsites.spots
              }
            }
          ],
        }
      });

      // create a layer for the camp spots
      map.addLayer({
        id: 'camp-point',
        type: 'symbol',
        source: 'campPoints',
        layout: {
          'icon-image': 'tent',
          'icon-allow-overlap': true
        },
        paint: {}
      });

      // add the source of the ending point
      map.addSource('endingPoint', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 4,
              geometry: {
                id: value.current._id,
                type: 'Point',
                coordinates: [value.current.tripRoute.points[value.current.tripRoute.points.length -1][0], 
                value.current.tripRoute.points[value.current.tripRoute.points.length -1][1]]
              }
            }
          ],
        }
      });
      
      // create layer for the ending point
      map.addLayer({
        id: 'end-point',
        type: 'symbol',
        source: 'endingPoint',
        layout: {
          "icon-image": "end",
          "icon-anchor": 'bottom',
          'icon-allow-overlap': true
        },
      });
    });

    // map settings 
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // zoom in on the route bounds
    const coordinates = value.current.tripRoute.points;
    const bounds = coordinates.reduce( (bounds, coord) => {
      return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    map.fitBounds(bounds, { padding: 30 });
    
    return () => map.remove();
  }, [value]);

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full h-screen md:w-2/3 md:h-full" ref={mapContainerRef}/>
      <Detail className="w-full h-1/4 overflow-y-hidden md:w-1/3 md:h-full" />
    </div>
  );
};

export default MapDetail;