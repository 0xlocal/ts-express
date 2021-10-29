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

export class AuthenticationService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  public async register(user: User) {
    if (await this.userRepository.findOne({ email: user.email })) {
      throw new UserWithThatEmailAlreadyExistsException(user.email);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    const tokenData = this.createToken(newUser);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      newUser,
    };
  }

  public async login(userData: User) {
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
