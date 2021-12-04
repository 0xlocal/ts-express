import { getConnection } from "typeorm";
import User from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import HttpException from "../exception/http.exception";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  public index = async () => {
    const users = await this.userRepository.find();

    return users;
  };

  public getOne = async (id: number) => {
    const user = await this.userRepository.findOne(id);
  };

  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);

    return newUser;
  };

  public update = async (user: User, id: number) => {
    const updatedUser = await this.userRepository.update(id, user);

    return updatedUser;
  };

  public delete = async (id: number) => {
    const deletedUser = await this.userRepository.softDelete(id);

    if (!deletedUser.affected) {
      throw new HttpException(404, `User with id ${id} not found`);
    }
  };
}
