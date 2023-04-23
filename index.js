// // index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log('It worked! Returned coordinates:', coordinates);

    fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log('It worked! Returned flyOverTimes:', flyOverTimes);
    });
  });
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    console.log(passTimes);
  });


});

