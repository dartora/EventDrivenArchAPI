import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ride } from '../../models/rideModel';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { DriversService } from '../drivers/drivers.service';
import { Driver } from 'models/driverModel';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { CreateRideDto } from './dto/create-ride.dto';

@Injectable()
export class RideService {
  constructor(
    @InjectModel(Ride)
    private readonly rideRepository: typeof Ride,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly driversService: DriversService,
  ) {}

  private readonly GOOGLE_MAPS_API_URL = this.configService.get<string>('GOOGLE_MAPS_API_URL');
  private readonly GOOGLE_MAPS_API_KEY = this.configService.get<string>('GOOGLE_API_KEY');

  private async isValidDriver(driverId: string): Promise<boolean> {
    const driver = await this.driversService.findOne(Number(driverId));
    return driver !== null;
  }

  private async isValidDistance(distance: number, driverId: string): Promise<boolean> {
    const driver = await this.driversService.findOne(Number(driverId));
    return driver !== null && distance >= driver.MINIMO;
  }

  async create(id: number, createRideDto: CreateRideDto) {
    // Função de validação
    const validateRideData = (createRideDto: CreateRideDto) => {
      if (!createRideDto.originAddress || !createRideDto.destinationAddress) {
        throw new Error("Os endereços de origem e destino não podem estar em branco.");
      }
      if (!id) {
        throw new Error("O id do usuário não pode estar em branco.");
      }
      if (createRideDto.originAddress === createRideDto.destinationAddress) {
        throw new Error("Os endereços de origem e destino não podem ser o mesmo endereço.");
      }
      if (!createRideDto.driverId || !this.isValidDriver(createRideDto.driverId)) {
        throw new Error("Uma opção de motorista foi informada e é uma opção válida.");
      }
      if (!this.isValidDistance(createRideDto.distance, createRideDto.driverId)) {
        throw new Error("A quilometragem informada realmente é válida para o motorista selecionado.");
      }

    };
     // Valida os dados
    validateRideData(createRideDto);

    // Cria o objeto para inserir no banco de dados
    const rideData = {
      USER_ID: id,
      ORIGIN_ADDRESS: createRideDto.originAddress,
      DESTINATION_ADDRESS: createRideDto.destinationAddress,
      DRIVER_ID: Number(createRideDto.driverId),
      DISTANCE: createRideDto.distance,
      STATUS: 'PENDING',
      PRICE: createRideDto.price
    } as Ride;

    return this.rideRepository.create(rideData);
  }

  findAll() {
    return `This action returns all rides`;
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
    // Validations
    if (!userId) throw new BadRequestException('User ID cannot be empty.');
    if (!origin || !destination) throw new BadRequestException('Origin and destination cannot be empty.');
    if (origin === destination) throw new BadRequestException('Origin and destination cannot be the same.');

    // Call Google Maps API
   const routeData = await this.getRouteData(origin, destination);

    // Calculate distance in kilometers
   const distanceInKm = routeData.routes[0]?.legs[0]?.distance?.value / 1000;
   
    if (!distanceInKm) throw new BadRequestException('Could not calculate the distance.');

    // Available drivers (mocked or fetched from a database)
 
   let drivers = await this.driversService.findAll(); // Fetch available drivers
   
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
