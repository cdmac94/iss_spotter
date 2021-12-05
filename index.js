// // index.js
const fetchMyIP= require('./iss').fetchMyIP;
const fetchCoordsByIp = require('./iss').fetchCoordsByIp;
const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;
const nextISSTimesForMyLocation = require('./iss').nextISSTimesForMyLocation;

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   if (error) {
//     callback(error, null);
//     return;
//   }
//   //if non-200 status, assume server error
//   if (response.statusCode !== 200) {
//     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//     callback(Error(msg), null);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIp('24.68.26.53',(error, data) => {
//   console.log('Error: ',error, '\nData: ', data);
// });

// myCoords = {
//   latitude: '48.4777', 
//   longitude: '-123.3658'
// };
// fetchISSFlyOverTimes(myCoords, (error, passtimes) => {
//   if (error) {
//     console.log(`Sorry if won't work: ${error}`);
//     return;
//   }

//   console.log('It worked! here are you flyover times: ', passtimes);
// }); 

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
