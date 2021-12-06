import { Expose } from "class-transformer";

export class AuthorityDTO {
  @Expose()
  id?: number;

  @Expose()
  authorityName: string;

  @Expose()
  roleIds?: number;
}
