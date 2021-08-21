import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  limit?: number = 25;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
}
