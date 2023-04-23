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



module.exports = { fetchMyIP, fetchCoordsByIP };