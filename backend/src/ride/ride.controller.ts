import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { CreateEstimateRideDto } from './dto/create-estimate-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get()
  findAll() {
    return this.rideService.findAll();
  }

  @Get(':customer_id')
  findOne(@Param('customer_id') customerId: string, @Query('driver_id') driverId?: string) {
    return this.rideService.findOne(+customerId, driverId);
  }
  @Post('estimate')
  estimate(@Body() createEstimateRideDto: CreateEstimateRideDto) {
    return this.rideService.estimate(createEstimateRideDto);
  }
  
  @Patch('confirm')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(+id, updateRideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rideService.remove(id);
  }
}
