import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
        TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbPort = configService.get<number>('DB_PORT');
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: dbPort !== undefined ? dbPort : 5432, // Check for undefined and provide a default
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [Event],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    EventsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}