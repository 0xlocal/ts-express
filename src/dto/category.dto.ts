import { Expose } from "class-transformer";

export class CategoryDTO {
  @Expose()
  id?: number;

  @Expose()
  categoryName: string;
}
