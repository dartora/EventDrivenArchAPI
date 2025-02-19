// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    return event;
  }

  // src/events/events.service.ts
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    return event;
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
