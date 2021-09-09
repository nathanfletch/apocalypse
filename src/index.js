import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApocalypseService from "./apocalypse-service";
import axios from "axios";

$(document).ready(function () {
  let fireballs;
  let comets;

  $("#fireball-select").click(function () {
    axios(`https://ssd-api.jpl.nasa.gov/fireball.api`)
    // ApocalypseService.getFireballs()
    .then((responseObject) => {
      fireballs = responseObject.data.data
        .filter((fireball) => parseFloat(fireball[2]) >= 14)
        .sort((a, b) => b[2] - a[2]);

      
    }, (error) => {
      $('#fireball-select').text(`There was an error processing your request: ${error}`);
      
    })
    .then(() => {
      console.log(fireballs[0][3]);
      axios(`http://api.openweathermap.org/geo/1.0/reverse?lat=${fireballs[0][3]}&lon=${fireballs[0][5]}&limit=1&appid=${process.env.API_KEY}`).then(data => {
        console.log(data.data[0]);
        displayTopTenFireballs(data.data[0]);
      })
    }
      // ${fireballs[0][3]} ${fireballs[0][5]}
      
      
      //make a new api call
    );
    
  });

  function displayTopTenFireballs(location) {
    const topTenHtml = fireballs.map((fireball, i) => {
      let fireballHtml = `<tr id="${i}">
      <td>${fireball[2]}</td>
      <td>${fireball[3]}</td>
      <td>${fireball[5]}</td>`;
      if(i === 0) {
        fireballHtml += `<td>${location.name}, ${location.country}</td>
        </tr>`;
      } else {
        fireballHtml += `<td></td></tr>`
      }
      return fireballHtml;
    });
    $("#fireball-table").append(topTenHtml);
    $("#landing-screen").hide();
    $("#fireball-screen").show();
  }

  $("#comet-select").click(function () {
    let promise = ApocalypseService.getComets();
    promise.then(function (response) {
      comets = JSON.parse(response)
        .data.sort((a, b) => b.ip - a.ip)
        .slice(0, 10);
      displayTopTenComets();
    });
  });

  function displayTopTenComets() {
    const topTenHtml = comets.map((comet) => {
      return `<tr id="${comet.id}">
          <td>${comet.fullname}</td>
          <td>${comet.ip}</td>
          <td>${comet.range}</td>
        </tr>`;
    });
    $("#comet-table").append(topTenHtml);
    $("#landing-screen").hide();
    $("#comet-screen").show();
  }
});
