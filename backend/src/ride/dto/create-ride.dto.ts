import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRideDto {
  @IsNotEmpty()
  @IsString()
  userId!: number;

  @IsNotEmpty()
  @IsString()
  origin!: string;

  @IsNotEmpty()
  @IsString()
  destination!: string;
}
