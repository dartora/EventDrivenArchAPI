import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrapMicroservice() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'], // URL do RabbitMQ
        queue: 'consent_events', // Nome da fila
        queueOptions: {
          durable: false, // Define se a fila é durável
        },
      },
    },
  );

  await app.listen();
}

bootstrapMicroservice();
