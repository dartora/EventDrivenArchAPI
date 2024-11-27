import { BadRequestException, Injectable } from '@nestjs/common';
// import { UpdateRideDto } from './dto/update-ride.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { DriversService } from '../drivers/drivers.service';
import { Driver } from 'models/driverModel';
import { EstimateRideDto } from './dto/estimate-ride.dto';

@Injectable()
export class RideService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly driversService: DriversService,
  ) {}

  private readonly GOOGLE_MAPS_API_URL = this.configService.get<string>('GOOGLE_MAPS_API_URL');
  private readonly GOOGLE_MAPS_API_KEY = this.configService.get<string>('GOOGLE_API_KEY');

  // create(createRideDto: CreateRideDto) {
  //   return 'This action adds a new ride';
  // }

  findAll() {
    return `This action returns alls ride`;
  }

  findOne(id: number, driverId?: string) {
    return `This action returns a #${id} ride`;
  }

  // update(id: number, updateRideDto: UpdateRideDto) {
  //   return `This action updates a #${id} ride`;
  // }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
  
 async estimate(estimateRideDto: EstimateRideDto) {
    const { userId, origin, destination } = estimateRideDto;
   console.log(estimateRideDto);
    // Validations
    if (!userId) throw new BadRequestException('User ID cannot be empty.');
    if (!origin || !destination) throw new BadRequestException('Origin and destination cannot be empty.');
    if (origin === destination) throw new BadRequestException('Origin and destination cannot be the same.');

    // Call Google Maps API
   const routeData = await this.getRouteData(origin, destination);
   console.log("routeData", {routeData})

    // Calculate distance in kilometers
   const distanceInKm = routeData.routes[0]?.legs[0]?.distance?.value / 1000;
   
   console.log(distanceInKm);
    if (!distanceInKm) throw new BadRequestException('Could not calculate the distance.');

    // Available drivers (mocked or fetched from a database)
 
   let drivers = await this.driversService.findAll(); // Fetch available drivers
   
   console.log(drivers);
    // Filter drivers who accept the trip based on minimum kilometers
    const availableDrivers = drivers
      .filter((driver: Driver) => distanceInKm >= driver.MINIMO)  // Note: using MINIMO instead of minKm
      .map((driver: Driver) => ({
        ...driver.dataValues,
        tripCost: (distanceInKm * driver.TAXA_KM).toFixed(2),  // Note: using TAXA_KM instead of pricePerKm
      }));

    if (availableDrivers.length === 0) throw new BadRequestException('No drivers available for this route.');

    return {
      distanceInKm,
      availableDrivers,
      route: routeData.routes, // Simplified route data
    };
  }

  private async getRouteData(origin: string, destination: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(this.GOOGLE_MAPS_API_URL!, {
        params: {
          origin,
          destination,
          key: this.GOOGLE_MAPS_API_KEY,
        },
      }));

      return response.data;
    } catch (error) {
      throw new BadRequestException('Error fetching route data from Google Maps.');
    }
  }
}
