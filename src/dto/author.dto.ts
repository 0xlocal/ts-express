import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AuthorDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  authorName: string;
}
