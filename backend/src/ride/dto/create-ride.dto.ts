import { IsNotEmpty, IsString, IsIn, IsNumber, Min } from 'class-validator';

export class CreateRideDto {
    @IsNotEmpty({ message: 'O endereço de origem não pode estar em branco.' })
    @IsString()
    originAddress!: string;

    @IsNotEmpty({ message: 'O endereço de destino não pode estar em branco.' })
    @IsString()
    destinationAddress!: string;
    
    @IsNumber()
    @IsNotEmpty({ message: 'O ID do usuário não pode estar em branco.' })
    userId!: string;

    @IsNumber()
    @IsNotEmpty({ message: 'O ID do motorista não pode estar em branco.' })
    driverId!: string;

    @IsNumber()
    @Min(0, { message: 'A quilometragem informada deve ser válida.' })
    distance!: number;

    @IsNumber()
    @Min(0, { message: 'O preço deve ser maior que zero.' })
    price!: number;
}
