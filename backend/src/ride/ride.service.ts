import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RideService {
  create(createRideDto: CreateRideDto) {
    return 'This action adds a new ride';
  }

  findAll() {
    return `This action returns alls ride`;
  }

  findOne(id: number, driverId?: string) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
  
  estimate(createRideDto: CreateRideDto) {
    return 'Esse endpoint deve fazer as seguintes validações: Os endereços de origem e destino recebidos não podem estar em branco. O id do usuário não pode estar em branco. ' +
           '● Os endereços de origem e destino não podem ser o mesmo endereço. ' +
           'Após as validações, ele deve: ' +
           '● Calcular a rota entre a origem e destino usando a API Routes do Google Maps. ' +
           '● Com base no retorno, deve listar os motoristas disponíveis para a viagem de acordo com a quilometragem mínima que aceitam, cada um com seu respectivo valor, usando como base a seguinte tabela.';
  }
}
