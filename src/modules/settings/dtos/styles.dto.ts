import { IsNotEmpty, Length } from 'class-validator';

export class StylesDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
  
  @IsNotEmpty()
  @Length(3, 1000)
  description: string;
}
