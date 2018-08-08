import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import data from "./spots.json";
import "../../App.css";
import { MSW_DATA } from "./msw.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFja2dyb3NzbWFuIiwiYSI6ImNpbWZqeG1hMjAxcHl2Y202cmhlZGRjYXcifQ.1-so8LElW5dTGT5o941u1w";

function surflineRanking(ranking) {
  let rating = "";
  // if ranking is poor, red
  if (ranking === "FLAT") {
    rating = `<li class="flat rat list-group-item">FLAT</li>`;
  } else if (ranking === "VERY POOR") {
    rating = `<li class="verypoor rat list-group-item">VERY POOR</li>`;
  } else if (ranking === "POOR") {
    rating = `<li class="poor rat list-group-item">POOR</li>`;
  } else if (ranking === "FAIR") {
    rating = `<li class="fair rat list-group-item">FAIR</li>`;
  } else {
    rating += `<li class="good rat list-group-item">GOOD</li>`;
  }
  return rating;
}

function mswRanking(ranking) {
  let rating = "";
  // if ranking is zero, sad face
  if (ranking === 0) {
    rating += `<li class="glyphicon glyphicon-star-empty"></li>`;
  } else {
    for (let i = 0; i < ranking; i++) {
      rating += `<li class="glyphicon glyphicon-star" style="color:#60b9e4"></li>`;
    }
  }
  // loop over ranking.
  return rating;
}
class Map extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const getThis = () => {
      return this;
    };
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      accessToken:
        "pk.eyJ1IjoiamFja2dyb3NzbWFuIiwiYSI6ImNpbWZqeG1hMjAxcHl2Y202cmhlZGRjYXcifQ.1-so8LElW5dTGT5o941u1w",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-72.6280813, 39.333501],
      zoom: 6.39
    });
    this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
    this.map.once("style.load", e => {
      this.map.loadImage(
        "https://cdn0.iconfinder.com/data/icons/hand-conversation/91/Hand_17-512.png",
        function(error, image) {
          if (error) throw error;
          getThis().map.addImage("surf-icons", image);
          getThis().map.addSource("spots", {
            type: "geojson",
            data: data,
            maxzoom: 12
          });
          getThis().map.addLayer({
            id: "spots-layer",
            type: "symbol",
            source: "spots",
            layout: {
              "icon-image": "surf-icons",
              "icon-size": 0.05
            }
          });
          getThis().map.on("click", "spots-layer", e => {
            var spot = e.features[0].properties;
            var surfline = fetch(
              "https://cors-anywhere.herokuapp.com" +
                "/" +
                spot.Surfline_Rating,
              {
                method: "GET",
                mode: "cors",
                headers: {
                  Accept: "application/json"
                }
              }
            )
              .then(res => {
                return res.json();
              })
              .catch(res => console.error(res));
            var msw_spot = e.features["0"].properties;
            var msw = fetch(
              "https://cors-anywhere.herokuapp.com" + "/" + msw_spot.MSW_Rating,
              {
                method: "GET",
                mode: "cors",
                headers: {
                  Accept: "application/json"
                }
              }
            )
              .then(res => {
                return res.json();
              })
              .catch(res => console.error(res));
            var allRequests = { surfline: {}, msw: {} };
            Promise.all([surfline, msw])
              .then(function(values) {
                allRequests.surfline = values;
                allRequests.msw = values[1];
                console.log(allRequests);
                return allRequests;
              })
              .then(res => {
                console.log(res);
                var allConditions = `<div class="spotmarker">
                <h1 class="h-font">Location:\n${spot.Surf_Spot_Name}</h1>\n
                <h3 id="h2font">Surf Height:</h3>\n
                <li class="list-group-item">${
                  res.surfline["0"].Analysis.surfRange["0"]
                }</li>\n
                <h3 id="h3font">Surfline Rating:</h3>\n
                ${surflineRanking(
                  res.surfline["0"].Analysis.generalCondition["0"]
                )}
                <h3 id="h3font">MSW Rating:</h3>\n
                ${mswRanking(res.msw["0"].solidRating)}
                </div>\n
                `;
                new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(allConditions)
                  .addTo(getThis().map),
                  { once: true };
              });
          });
        }
      );
    });
  }
  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%"
      // icon: ""
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}
export default Map;
