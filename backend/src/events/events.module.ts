import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event])], // Register the Event entity here
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
