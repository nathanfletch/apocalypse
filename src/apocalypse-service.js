export default class ApocalypseService {  
  static getComets() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://ssd-api.jpl.nasa.gov/sentry.api`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  // static fireballs;
  static getFireballs() {
    return fetch(`https://ssd-api.jpl.nasa.gov/fireball.api`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      //should this go in the other file? do i need to do more to handle this?
      .catch(function(error) {
        return error;
      })
  }
}