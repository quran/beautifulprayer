export default (lat, lng) =>
  fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(new Date().getTime() / 1000)}&key=AIzaSyDf0Ko76wn1zoj5LjCm1zBs9KnUBbvWTjI`)
  .then(response => response.json());
