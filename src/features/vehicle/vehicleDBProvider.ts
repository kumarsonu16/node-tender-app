import VehicleModel from "./models/vehicleModal";
import VehicleTrackingModel from "./models/vehicleTrackingModal";
import VehicleMaintenance from "./models/vehicleMaintenanceModal";

export const getVehiclesFromDB= async (): Promise<any> => {
  return await VehicleModel.find();
};

export const createVehicleInDB = async (data: any): Promise<any> => {
  return await VehicleModel.create(data);
};

export const createVehicleTrackingInDB = async (data: any): Promise<any> => {
  return await VehicleTrackingModel.create(data);
};

export const getTrackingsDetailsFromDB = async (filter: any): Promise<any> => {
  return await VehicleTrackingModel.find(filter);
};

export const getTrackingsDetailsFromDBForAnalytics = async (filter: any): Promise<any> => {
  return await VehicleTrackingModel.aggregate([
    { $match: filter},
    { $group: { _id: "$vehicleId", logData: { $push: { location: "$location.coordinates", timestamp: "$createdAt" } }}}
  ])
};

export const getMaintenanceDetailsFromDB = async (filter: any): Promise<any> => {
  return await VehicleMaintenance.find(filter);
};

export const logMaintenanceInDB = async (query: any): Promise<any> => {
  return await VehicleMaintenance.create(query);
};



