import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RideModule } from './ride/ride.module';
import { HttpModule } from '@nestjs/axios';
import { DriversModule } from './drivers/drivers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: '.env', // Path to your .env file
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule,DriversModule, RideModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<'postgres' | 'mysql' | 'sqlite' | 'mssql'>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432), // Default to 5432 if not provided
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService], // Inject ConfigService to access env variables
    }),
        HttpModule.register({
      timeout: 5000, // Tempo limite em ms
      maxRedirects: 5, // Número máximo de redirecionamentos
    }),
      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
