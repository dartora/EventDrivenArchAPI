import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MicroserviceController {
  @MessagePattern('consent_events') // Escuta a fila 'consent_events'
  handleConsentEvent(@Payload() data: any) {
    console.log('Received consent event:', data);
    // Aqui você pode processar o evento
  }
}
