import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class RideService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly driversService: DriversService,
  ) {}

  private readonly GOOGLE_MAPS_API_URL = this.configService.get<string>('GOOGLE_MAPS_API_URL');
  private readonly GOOGLE_MAPS_API_KEY = this.configService.get<string>('GOOGLE_API_KEY');

  create(createRideDto: CreateRideDto) {
    return 'This action adds a new ride';
  }

  findAll() {
    return `This action returns alls ride`;
  }

  findOne(id: number, driverId?: string) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
  
 async estimate(createRideDto: CreateRideDto) {
    const { userId, origin, destination } = createRideDto;
   console.log(createRideDto);
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
 
   const availableDrivers = await this.driversService.findAll(); // Fetch available drivers
   console.log(availableDrivers);
    // Filter drivers who accept the trip based on minimum kilometers
    // const availableDrivers = drivers
    //   .filter((driver) => distanceInKm >= driver.minKm)
    //   .map((driver) => ({
    //     ...driver,
    //     tripCost: (distanceInKm * driver.pricePerKm).toFixed(2), // Calculate cost
    //   }));

    // if (availableDrivers.length === 0) throw new BadRequestException('No drivers available for this route.');

    // return {
    //   distanceInKm,
    //   availableDrivers,
    //   route: routeData.routes, // Simplified route data
    // };
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
