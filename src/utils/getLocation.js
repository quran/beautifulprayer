export default () =>
  fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDf0Ko76wn1zoj5LjCm1zBs9KnUBbvWTjI', { method: 'POST' })
  .then(response => response.json());
