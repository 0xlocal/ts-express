import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class BookDetailDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  bookNumber: string;
}
