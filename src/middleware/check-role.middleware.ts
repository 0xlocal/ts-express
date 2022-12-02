import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.tokenPayload.userId;

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);

      if (roles.indexOf(user.role["roleName"]) > 1) {
        next();
      } else {
        res.status(401).send();
      }
    } catch (error) {
      res.status(401).send();
    }
  };
};
