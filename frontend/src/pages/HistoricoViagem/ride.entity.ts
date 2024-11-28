interface Ride {
  ID: number;
  ORIGIN_ADDRESS: string;
  DESTINATION_ADDRESS: string;
  DISTANCE: number;
  PRICE: number;
  USER_ID: number;
  DRIVER_ID: number;
  STATUS: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}