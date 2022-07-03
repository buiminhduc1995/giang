import client from './configApi';
import Polyline from "@mapbox/polyline/src/polyline";
import { token } from './authApi'

export default {
  // getDirections MapScreen
  getDirections(startLoc, destinationLoc) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&alternatives=true&key=AIzaSyBErUKM7ThaPxTx0wJ7BSMFEJ_kyD_SP2o`;
    return client.get(url, { apiName: "getDirections" }).then(response => {
      let coords = [];
      let totalDistance = 0;
      let totalDuration = 0;
      response.data.routes.map((item, index) => {
        let points = Polyline.decode(item.overview_polyline.points);
        let coord = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        });
        coords.push(coord);
      });
      if (coords.length > 0) {
        let legs = response.data.routes[0].legs;
        for (let i = 0; i < legs.length; ++i) {
          totalDistance += legs[i].distance.value;
          totalDuration += legs[i].duration.value;
        }
      } else {
        return false;
      }
      let totalMinutes = Math.round(totalDuration / 60);
      let days = Math.floor(totalMinutes / (24 * 60));
      let hours = 0;
      if (days === 0) {
        hours = Math.floor(totalMinutes / 60);
      } else {
        hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
      }
      let minutes = totalMinutes;
      if (days > 0 && hours === 0) {
        minutes = totalMinutes - days * 24 * 60
      } else if (days === 0 && hours > 0) {
        minutes = totalMinutes - hours * 60
      } else if (days > 0 && hours > 0) {
        minutes = totalMinutes - days * 24 * 60 - hours * 60;
      }
      return {
        coords,
        distance: Math.round(totalDistance / 1000),
        duration: ((days > 0) ? (days + " Ngày ") : "") + ((hours > 0) ? (hours + " giờ ") : "") + ((minutes > 0) ? (minutes + " phút") : "")
      };
    });
  },
}