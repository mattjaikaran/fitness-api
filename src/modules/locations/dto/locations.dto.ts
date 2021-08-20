import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(10, 255)
  @IsNotEmpty()
  address: string;

  @IsString()
  @Length(10, 20)
  @IsNotEmpty()
  contactNumber: string;

  @IsEmail()
  @Length(3, 255)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(3, 1000)
  @IsNotEmpty()
  description: string;
}



export class UpdateLocationDto {
  @IsString()
  @Length(3, 255)
  @IsOptional()
  name: string;

  @IsString()
  @Length(10, 255)
  @IsOptional()
  address: string;

  @IsString()
  @Length(10, 20)
  @IsOptional()
  contactNumber: string;

  @IsOptional()
  @Length(3, 255)
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 1000)
  @IsOptional()
  description: string;
}
