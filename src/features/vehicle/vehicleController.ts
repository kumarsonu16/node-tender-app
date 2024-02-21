import { Request, Response } from "express";
import {
  getVehicles,
  createNewVehicle,
  saveTrackingsDetails,
  getTrackingsDetails,
  getMaintenanceDetails,
  logMaintenance,
  getVehicleAnalyticsDetails,
} from "./vehicleService";

export const getVehiclesList = async (req: Request,res: Response): Promise<any> => {
  try {
    const vehicles = await getVehicles();

    // If there are no vehicles, return a 204 response
    if (!vehicles || vehicles.length === 0) {
      return res.status(204).json({ message: "No vehicles found" });
    }
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const saveVehicle = async (req: Request,res: Response): Promise<any> => {
  try {
    const vehicles = await createNewVehicle(req.body)
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error saving vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleTrackingsDetails = async (req: Request,res: Response): Promise<any> => {
  try {
    const filter = req.params.vehicleId ? { vehicleId: req.params.vehicleId } : {};
    const vehicles = await getTrackingsDetails(filter);
    if (!vehicles || vehicles.length === 0) {
      return res.status(204).json({ message: "No vehicles found" });
    }
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const saveVehicleTraking = async (req: Request,res: Response): Promise<any> => {
  try {
    const vehicles = await saveTrackingsDetails(req.body)
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error saving vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleMaintenanceDetails = async (req: Request,res: Response): Promise<any> => {
  try {
    const filter = req.params.vehicleId ? { vehicleId: req.params.vehicleId } : {};
    const vehicles = await getMaintenanceDetails(filter);
    console.log(vehicles)
    if (!vehicles || vehicles.length === 0) {
      return res.status(204).json({ message: "No vehicles maintenance found" });
    }
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const saveMaintenanceDetails = async (req: Request,res: Response): Promise<any> => {
  try {
    const vehicles = await logMaintenance(req.body);
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error saving vehicle maintenance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleAnalytics = async (req: Request, res: Response): Promise<any> => {
  try {
    const filter = req.params.vehicleId ? { vehicleId: req.params.vehicleId } : {};
    console.log("filter", filter);
    const data = await getVehicleAnalyticsDetails(filter);
    if (!data) {
      return res.status(204).json({ message: "No data found!" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
