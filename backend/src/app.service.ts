// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    const dbHost = this.configService.get<string>('DB_HOST'); // Use the key from your .env file
    const dbUsername = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbPort = this.configService.get<string>('DB_PORT');
    return { dbHost, dbUsername, dbPassword,dbPort };
  }
}