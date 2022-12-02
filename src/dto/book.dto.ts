import { Expose } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BookDetailDTO } from "./book-detail.dto";

export class BookDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  sku: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsString()
  year: string;

  @Expose()
  @IsOptional()
  @IsString()
  image?: string;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsNumber()
  categoryId: number;

  @Expose()
  @IsNumber()
  authorId: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  details?: BookDetailDTO[];
}
