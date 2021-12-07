import { CategoryRepository } from "../repository/category.repository";
import { getConnection } from "typeorm";
import { Category } from "../entity/category.entity";
import HttpException from "../exception/http.exception";

export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository =
      getConnection().getCustomRepository(CategoryRepository);
  }

  public index = async () => {
    const categories = await this.categoryRepository.find();

    return categories;
  };

  public getOne = async (id: number) => {
    const category = await this.categoryRepository.findOne(id);

    return category;
  };

  public create = async (category: Category) => {
    const newCategory = await this.categoryRepository.save(category);

    return newCategory;
  };

  public update = async (category: Category, id: number) => {
    const updatedCategory = await this.categoryRepository.update(id, category);

    return updatedCategory;
  };

  public delete = async (id: number) => {
    const deletedCategory = await this.categoryRepository.delete(id);

    if (!deletedCategory.affected) {
      throw new HttpException(404, `Category with id ${id} not found`);
    }
  };
}
