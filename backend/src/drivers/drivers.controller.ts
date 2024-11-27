// src/drivers/drivers.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from '../../models/driverModel';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() driver: Driver) {
    return this.driversService.create(driver);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.driversService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() driver: Partial<Driver>) {
    return this.driversService.update(id, driver);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.driversService.remove(id);
  }
}