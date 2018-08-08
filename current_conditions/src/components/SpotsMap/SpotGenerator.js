// import React, { Component } from "react";
// import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
// import Pin from "./Pin";

// const TOKEN =
//   "pk.eyJ1IjoiamFja2dyb3NzbWFuIiwiYSI6ImNpbWZqeG1hMjAxcHl2Y202cmhlZGRjYXcifQ.1-so8LElW5dTGT5o941u1w";

// const NavStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   padding: "10px"
// };

// const URL = 'window.location.origin === "localhost"'
//   ? "http://localhost:3001"
//   : "https://currentconditions-app.herokuapp.com/spots";

// export default class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewport: {
//         latitude: 39.333501,
//         longitude: -72.6280813,
//         zoom: 6.39,
//         bearing: 0,
//         pitch: 0,
//         width: 500,
//         height: 500
//       },
//       popupInfo: null
//     };
//     this.renderPopup = this.renderPopup.bind(this);
//   }
//   renderPopup() {
//     return (
//       this.state.popupInfo && (
//         <Popup
//           tipSize={5}
//           anchor="bottom-right"
//           longitude={this.state.popupInfo.state.longitude}
//           latitude={this.state.popupInfo.state.latitude}
//           onClose={() => this.setState({ popupInfo: null })}
//           closeOnClick={true}
//         >
//           <p>Hey</p>
//         </Popup>
//       )
//     );
//   }
//   render() {
//     return (
//       <MapGL
//         {...this.state.viewport}
//         mapStyle="mapbox://styles/jackgrossman/cjik9ad460fqo2spiry7jczkn"
//         mapboxApiAccessToken={TOKEN}
//       >
//         {markers}
//         {this.renderPopup()}
//         <div className="nav" style={this.state.navStyle}>
//           <NavigationControl />
//           <Marker
//             longitude={-72.6280813}
//             latitude={39.333501}
//             offsetTop={0}
//             offsetLeft={0}
//           >
//             <Pin onClick={() => this.setState({ popupInfo: popupInfo })} />
//           </Marker>
//         </div>
//       </MapGL>
//     );
//   }
// }
