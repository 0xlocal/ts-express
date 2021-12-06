import { Expose } from "class-transformer";

export class AuthorDTO {
  @Expose()
  id?: number;

  @Expose()
  authorName: string;
}
