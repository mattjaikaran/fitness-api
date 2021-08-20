import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class BoxesDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  @Length(3)
  longDescription: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxCapacity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  floorPlanId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  styleId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  locationId: number;

  @IsNotEmpty()
  @IsArray()
  features: number[];

  @IsNotEmpty()
  @IsBoolean()
  heated: boolean;
}
export class UpdateBoxesDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  shortDescription: string;

  @IsOptional()
  @IsString()
  @Length(3)
  longDescription: string;

  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxCapacity: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  floorPlanId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  styleId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  locationId: number;

  @IsOptional()
  @IsArray()
  features: number[];

  @IsOptional()
  @IsBoolean()
  heated: boolean;
}
