import { Transport, RmqOptions } from '@nestjs/microservices';

export const rabbitmqConfig: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@localhost:5672'],
    queue: 'consent_events',
    queueOptions: {
      durable: true,
    },
  },
};
