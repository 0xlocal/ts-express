import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UserDTO {
  // @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  identityNum: string;

  @IsDateString()
  dob: Date;

  @IsString()
  pob: string;

  @IsPhoneNumber("ID")
  phone: string;

  @IsNumber()
  roleId?: number;
}
