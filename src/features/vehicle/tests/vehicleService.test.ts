import * as Provider from "../vehicleService";
import * as vehicleDBProvider from "../vehicleDBProvider";
import { stub, restore } from "sinon";
import { vehiclesMockData } from "./vehicleMockData";

describe("#VehicleService", () => {
  let serviceRes: null = null,
    error = null;
  afterEach(() => {
    serviceRes = null;
    error = null;
    restore();
  });
  describe("Success when vehicles found", () => {
    beforeAll(async () => {
      stub(vehicleDBProvider, "getVehiclesFromDB").resolves(vehiclesMockData);
      try {
        serviceRes = await Provider.getVehicles();
      } catch (error) {
        error = error;
      }
    });
    it("get vehicles successfully", function () {
      expect(serviceRes).toEqual(vehiclesMockData);
    });
  });
});
