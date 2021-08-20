import { IsNotEmpty, Length } from 'class-validator';

export class DaysDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
}
