import { getConnection } from "typeorm";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import HttpException from "../exception/http.exception";
import { UserDTO } from "../dto/user.dto";
import { plainToClass } from "class-transformer";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  public index = async () => {
    const users = await this.userRepository.find();

    // * removing password property
    const result = users.map((user) => {
      return this.castToUserDTO(user);
    });

    return result;
  };

  public getOne = async (id: number) => {
    const user = await this.userRepository.findOne(id);

    if (user) {
      return this.castToUserDTO(user);
    }
  };

  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);

    return this.castToUserDTO(newUser);
  };

  public update = async (user: User, id: number) => {
    // * id checking if did not input the id
    if (!user.id) {
      user.id = id;
    }

    const updatedUser = await this.userRepository.save(user);

    return this.castToUserDTO(updatedUser);
  };

  public delete = async (id: number) => {
    const deletedUser = await this.userRepository.softDelete(id);

    if (!deletedUser.affected) {
      throw new HttpException(404, `User with id ${id} not found`);
    }
  };

  private castToUserDTO(user: User) {
    const result = plainToClass(UserDTO, user, {
      excludeExtraneousValues: true,
    });

    return result;
  }
}
