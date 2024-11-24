import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'postgres',
      models: [__dirname + '/models'],
      autoLoadModels: true,
      synchronize: true,
    }),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
