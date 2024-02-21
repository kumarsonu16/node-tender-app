import mongoose, { Schema } from "mongoose";

enum Status {
  active = "1",
  maintenance = "2",
}
// Define the interface representing a vehicle document
interface Vehicle {
  type: string;
  model: string;
  status: Status;
}

// Define the schema for the vehicle model
const VehicleSchema: Schema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Status,
      required: true,
      default: "1",
      trim: true,
    },
  },
  { timestamps: true }
);

// Define and export the vehicle model
const VehicleModel = mongoose.model<Vehicle>("Vehicle", VehicleSchema);

export default VehicleModel;
