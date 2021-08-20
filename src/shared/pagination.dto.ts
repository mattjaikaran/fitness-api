import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 25;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
}