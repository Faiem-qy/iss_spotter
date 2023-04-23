const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json&callback=getIP`;

  request(url, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    }
  });
};


const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from JSON API
  const url = `http://ipwho.is/${ip}`;

  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    // else {
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
    // }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const flightTimes = JSON.parse(body);

    const flightTimesResponse = flightTimes.response;
    callback(null, flightTimesResponse);
  });

};
/*
* Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
* Input:
*   - A callback with an error or results. 
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly-over times as an array (null if error):
*     [ { risetime: <number>, duration: <number> }, ... ]
*/

// empty for now



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      // console.log("It didn't work!", error);
      return callback(error, null);
    }
    // console.log('It worked! Returned IP:', ip);

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        // console.log("It didn't work!", error);
        return callback(error, null);
      }
      // console.log('It worked! Returned coordinates:', coordinates);

      fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
        if (error) {
          // console.log("It didn't work!", error);
          return callback(error, null);
        }
        callback(null, flyOverTimes);
        // console.log('It worked! Returned flyOverTimes:', flyOverTimes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };