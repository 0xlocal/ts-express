import * as jwt from "jsonwebtoken";
import salt from "../config/salt";
import { getRepository } from "typeorm";
import WrongAuthenticationTokenException from "../exception/wrongAuthTokenException";
import AuthenticationTokenMissingException from "../exception/authTokenMissingException";
import { NextFunction, Response } from "express";
import RequestWithUser from "../interface/requestWithUser.interface";
import User from "../entity/user.entity";
import DataStoredInToken from "../interface/dataStoredInToken.interface";

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

// const authMiddleware = () => {
//   return async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     const cookies = req.cookies;
//     const userRepository = getRepository(User);

//     if (cookies && cookies.Authorization) {
//       const secret = salt.secret;

//       try {
//         const verification = jwt.verify(
//           cookies.Authorization,
//           secret
//         ) as DataStoredInToken;

//         const id = verification._id;
//         const user = await userRepository.findOne(id);

//         if (user) {
//           req.user = user;
//           next();
//         } else {
//           next(new WrongAuthenticationTokenException());
//         }
//       } catch (error) {
//         next(new WrongAuthenticationTokenException());
//       }
//     } else {
//       next(new AuthenticationTokenMissingException());
//     }
//   };
// };

export default authMiddleware;
