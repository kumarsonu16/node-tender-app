import {
  getVehiclesFromDB,
  createVehicleInDB,
  getTrackingsDetailsFromDB,
  createVehicleTrackingInDB,
  getMaintenanceDetailsFromDB,
  logMaintenanceInDB,
  getTrackingsDetailsFromDBForAnalytics
} from "./vehicleDBProvider";

export const getVehicles = async (): Promise<any> => {
  return await getVehiclesFromDB();
};

export const createNewVehicle = async (data: any): Promise<any> => {
  return await createVehicleInDB(data);
};

export const getTrackingsDetails = async (filter: any): Promise<any> => {
  return await getTrackingsDetailsFromDB(filter);
};

export const saveTrackingsDetails = async (data: any): Promise<any> => {
  return await createVehicleTrackingInDB(data);
};

export const getMaintenanceDetails = async (filter: any): Promise<any> => {
  return await getMaintenanceDetailsFromDB(filter);
};

export const logMaintenance = async (data: any): Promise<any> => {
  return await logMaintenanceInDB(data);
};

export const getVehicleAnalyticsDetails = async (filter: any): Promise<any> => {
  const cursor = await getTrackingsDetailsFromDBForAnalytics(filter);
  const analyticsData = [];
  for (let i = 0; i < cursor.length; i++) {
    let totalDistance = 0;
    let totalHours = 0;
    let prevLocation: { latitude: any; longitude: any; timestamp: any; };
    const element = cursor[i] && cursor[i].logData;
    element.forEach(({ location , timestamp}: any) => {
      const latitude = location[0];
      const longitude = location [1];
        if (prevLocation) {
            const distance = calculateDistance(prevLocation.latitude, prevLocation.longitude, latitude, longitude);
            totalDistance += distance;
            const timeDiff = (timestamp.getTime() - prevLocation.timestamp.getTime()) / (1000 * 60 * 60); // Difference in hours
            totalHours += timeDiff;
        }
        prevLocation = { latitude, longitude, timestamp };
    });
    analyticsData.push({totalDistance : totalDistance.toFixed(2),totalHours : totalHours.toFixed(2), vehicleId: cursor[i]._id}); 
  }
  return analyticsData;
};


/**
 * Calculates the distance between two points on the earth.
 *
 * @param lat1 - The latitude of the first point.
 * @param lon1 - The longitude of the first point.
 * @param lat2 - The latitude of the second point.
 * @param lon2 - The longitude of the second point.
 * @returns The distance between the two points, in kilometers.
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
}