import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { UserRepository } from "../repository/user.repository";
import UserWithThatEmailAlreadyExistsException from "../exception/user-with-that-email-already-exist.exception";
import TokenData from "../interface/token-data.interface";
import salt from "../config/salt";
import DataStoredInToken from "../interface/data-stored-in-token.interface";
import WrongCredentialsException from "../exception/wrong-credentials.exception";
import User from "../entity/user.entity";
import { UserDTO } from "../dto/user.dto";

export class AuthenticationService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  public async register(userData: UserDTO) {
    if (await this.userRepository.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const tokenData = this.createToken(newUser);
    const cookie = this.createCookie(tokenData);

    /* const user: Omit<UserDTO, "password"> = {
      id: newUser.id,
      name: newUser.name,
      identityNum: newUser.identityNum,
      email: newUser.email,
      dob: newUser.dob,
      pob: newUser.pob,
      phone: newUser.phone,
      roleID: Number(newUser["role"]),
    }; */

    // const user: Omit<UserDTO, "password"> = UserDTO.generateObject(newUser);

    // removing unused properties
    const { password, createDate, createBy, updateBy, updateDate, ...user } =
      newUser;

    return {
      cookie,
      user,
    };
  }

  public async login(userData: UserDTO) {
    const user = await this.userRepository.findOne({ email: userData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);

        return {
          cookie,
          user,
        };
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }

  private createToken(user: User): TokenData {
    const expiresIn = salt.expiresIn;
    const secret = salt.secret;
    const dataStoredInToken: DataStoredInToken = {
      _id: user.id.toString(),
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
