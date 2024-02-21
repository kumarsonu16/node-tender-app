import mongoose, { Schema, Document } from "mongoose";

// Define an interface for vehicle tracking records
interface VehicleTrackingRecord extends Document {
  vehicleId: string;
  location: {
    type: string;
    coordinates: [number, number]; // longitude, latitude
  };
  fuelLevel: number;
  speed: number;
  timestamp: Date;
}

// Define the schema for vehicle tracking records
const VehicleTrackingRecordSchema: Schema = new Schema(
  {
    vehicleId: { type: String, required: true },
    fuelLevel: { type: Number, required: true, default: 0 },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    speed: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a GeoJSON index on the 'location' field for geospatial queries
VehicleTrackingRecordSchema.index({ location: "2dsphere" });

// Create and export the Mongoose model for vehicle tracking records
const VehicleTrackingRecordModel = mongoose.model<VehicleTrackingRecord>('VehicleTrackingRecord', VehicleTrackingRecordSchema);

export default VehicleTrackingRecordModel;