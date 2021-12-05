// const fetchMyIP = require('./iss_promised').fetchMyIP;
// const fetchCoordsByIP = require('./iss_promised').fetchCoordsByIP;
// const fetchISSFlyOverTimes = require('./iss_promised').fetchISSFlyOverTimes;
const nextISSTimesForMyLocation = require('./iss_promised').nextISSTimesForMyLocation;


// fetchMyIP ()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("Oops didn't work: ", error.message);
});