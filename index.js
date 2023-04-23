// index.js
const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("Your IP address is:", ip);
//   }
// });