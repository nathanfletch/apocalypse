import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApocalypseService from "./apocalypse-service";

$(document).ready(function () {
  let fireballs;
  let comets;

  $("#fireball-select").click(function () {
    ApocalypseService.getFireballs().then((data) => {
      fireballs = data.data
        .filter((fireball) => parseFloat(fireball[2]) >= 14)
        .sort((a, b) => b[2] - a[2]);

      displayTopTenFireballs();
    });
  });

  function displayTopTenFireballs() {
    const topTenHtml = fireballs.map((fireball, i) => {
      return `<tr id="${i}">
      <td>${fireball[2]}</td>
      <td>${fireball[3]}</td>
      <td>${fireball[5]}</td>
      <td><button>Check distance</button></td>
      </tr>`;
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
        .splice(0, 10);
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
