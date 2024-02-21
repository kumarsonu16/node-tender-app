
import { stub, restore } from "sinon";
import { mockReq, mockRes } from 'sinon-express-mock';
import { Request, Response } from 'express';
import { vehiclesMockData } from "./vehicleMockData";
import * as Provider from "../vehicleService";
import * as vehicleController from "../vehicleController";

describe("#VehiclesController", () => {
  let serviceRes: null = null,
  req: Request,
  res: Response,
  error = null;
  afterEach(() => {
    serviceRes = null;
    error = null;
    restore();
  });
  describe("Success when vehicles found", () => {
    beforeAll(async () => {
      stub(Provider, "getVehicles").resolves(vehiclesMockData);
       req = mockReq();
       res = mockRes();

      try {
        serviceRes = await vehicleController.getVehiclesList(req,res)
      } catch (error) {
        error = error;
      }
    });
    it.skip("get vehicles successfully", function () {
      expect(res.status(200)).toBe(true);
      // expect(res.json).to.be.calledWith(vehiclesMockData)
    });
  });
});
