import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { HttpModule } from '@nestjs/axios';
import { DriversModule } from 'src/drivers/drivers.module';
import { Ride } from '../../models/rideModel';

@Module({
  imports: [
    SequelizeModule.forFeature([Ride]),
    HttpModule,DriversModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
