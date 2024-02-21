import mongoose, { Document, Schema } from "mongoose";

// Define interface for Vehicle Maintenance document
interface IVehicleMaintenance extends Document {
  vehicleId: string;
  maintenanceType: string;
  description: string;
  cost: number;
  date: Date;
}

// Define schema for Vehicle Maintenance
const VehicleMaintenanceSchema: Schema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  maintenanceType: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Define and export model
const VehicleMaintenance = mongoose.model<IVehicleMaintenance>(
  "VehicleMaintenance",
  VehicleMaintenanceSchema
);

export default VehicleMaintenance;
