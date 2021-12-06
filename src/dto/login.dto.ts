import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class LoginDTO {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  password: string;
}
