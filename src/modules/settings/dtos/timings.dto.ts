import { IsNotEmpty } from 'class-validator';

export class TimingsDto {
  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  dayId: number;
}
