const request = require('request');



/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  
  const domain = 'https://api.ipify.org/?format=json';
  request(domain, (error, response, body) =>  {
    if (error === null) {
      const ip = JSON.parse(body).ip;
      callback(null,ip);
      return;
    //console.log('error\n\n\n', error);
    // console.log('response\n\n\n', response);
    // console.log('body\n\n\n', body)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error,null);
    return;
  });
};

const fetchCoordsByIp = function(ip, callback) {
  
  const domain = 'https://api.freegeoip.app/json/24.68.26.53?apikey=cd2756e0-5552-11ec-b1cd-637b953eac24';
  request(domain, (error, response, body) =>  {
    if (error === null) {
      const latLong = {
        latitude: JSON.parse(body).latitude,
        longitude: JSON.parse(body).longitude
      };
      callback(null,latLong);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error,null);
    return;

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const domain = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(domain, (error, response, body) => {
    if(error === null) {
      const passTimes = JSON.parse(body).response;
      callback(error, passTimes)
      return;
    }
    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error, null);
    return;
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


// module.exports = { fetchISSFlyOverTimes };
// module.exports = { fetchMyIP, fetchCoordsByIp };
module.exports = { nextISSTimesForMyLocation };