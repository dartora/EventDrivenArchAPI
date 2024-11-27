import { IsNotEmpty, IsString } from 'class-validator';

export class EstimateRideDto {
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
