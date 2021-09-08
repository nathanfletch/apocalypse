export default class ApocalypseService {  
  // static getComets() {
  //   return new Promise(function(resolve, reject) {
  //     let request = new XMLHttpRequest();
  //     const url = ``;
  //     request.onload = function() {
  //       if (this.status === 200) {
  //         resolve(request.response);
  //       } else {
  //         reject(request.response);
  //       }
  //     }
  //     request.open("GET", url, true);
  //     request.send();
  //   });
  // }

  static getFireballs() {
    return fetch(`https://ssd-api.jpl.nasa.gov/fireball.api`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      })
  }
}