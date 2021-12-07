import * as jwt from "jsonwebtoken";
import salt from "../config/salt";
import { getRepository } from "typeorm";
import WrongAuthenticationTokenException from "../exception/wrong-auth-token.exception";
import AuthenticationTokenMissingException from "../exception/auth-token-missing.exception";
import { NextFunction, Response } from "express";
import RequestWithUser from "../interface/request-with-user.interface";
import { User } from "../entity/user.entity";
import DataStoredInToken from "../interface/data-stored-in-token.interface";

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  const userRepository = getRepository(User);
  if (cookies && cookies.Authorization) {
    const secret = salt.secret;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userRepository.findOne(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
