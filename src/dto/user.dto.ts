import { Expose } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UserDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Expose()
  @IsString()
  identityNum: string;

  @Expose()
  @IsDateString()
  dob: Date;

  @Expose()
  @IsString()
  pob: string;

  @Expose()
  @IsPhoneNumber("ID")
  phone: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  roleId?: number;
}
