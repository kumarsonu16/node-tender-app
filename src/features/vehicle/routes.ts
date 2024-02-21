import { checkSearchParams } from "./validation";
import {
  getVehiclesList,
  saveVehicle,
  saveVehicleTraking,
  getVehicleTrackingsDetails,
  saveMaintenanceDetails,
  getVehicleMaintenanceDetails,
  getVehicleAnalytics
} from "./vehicleController";

export default [
  {
    path: "/api/v1/vehicles",
    method: "get",
    handler: [
      //checkSearchParams /*We can chain things like checking authorization, add caching and many more */
      getVehiclesList,
    ],
  },
  {
    path: "/api/v1/vehicles/registser",
    method: "post",
    handler: [
      saveVehicle,
    ],
  },
  {
    path: "/api/v1/vehicles/logs",
    method: "get",
    handler: [
      getVehicleTrackingsDetails,
    ],
  },
  {
    path: "/api/v1/vehicles/log",
    method: "post",
    handler: [
      saveVehicleTraking,
    ],
  },

  {
    path: "/api/v1/vehicles/maintenance/:vehicleId",
    method: "get",
    handler: [
      getVehicleMaintenanceDetails,
    ],
  },
  {
    path: "/api/v1/vehicles/maintenance",
    method: "get",
    handler: [
      getVehicleMaintenanceDetails,
    ],
  },
  {
    path: "/api/v1/vehicles/maintenance/add",
    method: "post",
    handler: [
      saveMaintenanceDetails,
    ],
  },
  {
    path: "/api/v1/vehicles/analytics/:vehicleId",
    method: "get",
    handler: [
      getVehicleAnalytics,
    ],
  },
  {
    path: "/api/v1/vehicles/analytics",
    method: "get",
    handler: [
      getVehicleAnalytics,
    ],
  },
];
