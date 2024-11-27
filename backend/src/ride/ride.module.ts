import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { HttpModule } from '@nestjs/axios';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
  imports: [HttpModule,DriversModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
