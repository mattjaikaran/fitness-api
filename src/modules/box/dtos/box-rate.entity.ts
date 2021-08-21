import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class BoxRatesDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  boxId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  timingId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.0)
  rate: number;
}
