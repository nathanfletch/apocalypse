import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApocalypseService from "./apocalypse-service";

$(document).ready(function() {
  $("#fireball-select").click(function() {
    const fireballs = ApocalypseService.getFireballs();
    console.log(fireballs[[PromiseResult]]);
    // const topTenFireballs = fireballs.filter(fireball => fireball.)
  });
})
