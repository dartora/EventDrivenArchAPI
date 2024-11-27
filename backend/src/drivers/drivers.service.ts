// src/drivers/drivers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from '../../models/driverModel';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver) private readonly driverModel: typeof Driver) {}

  create(driver: Driver) {
    return this.driverModel.create(driver);
  }

  findAll() {
    return this.driverModel.findAll();
  }

  findOne(id: number) {
    return this.driverModel.findByPk(id);
  }

  update(id: number, updatedDriver: Partial<Driver>) {
    return this.driverModel.update(updatedDriver, { where: { id } });
  }

  remove(id: number) {
    return this.driverModel.destroy({ where: { id } });
  }
}