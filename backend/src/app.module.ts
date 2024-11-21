import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [RideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
