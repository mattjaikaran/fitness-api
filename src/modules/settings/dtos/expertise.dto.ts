import { IsNotEmpty, Length } from 'class-validator';

export class ExpertiseDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
}
