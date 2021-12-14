import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AuthorityDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  authorityName: string;

  @Expose()
  @IsOptional()
  roleIds?: number[];
}
