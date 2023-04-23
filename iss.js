const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json&callback=getIP`;

  request(url, (error, response, body) => {
    console.log('statusCode:', response && response.statusCode);
    if (error) {
      callback(error, null);
    }
    else {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    }
  });
};



module.exports = { fetchMyIP };