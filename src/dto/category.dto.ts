import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CategoryDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  categoryName: string;
}
