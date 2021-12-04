import { EntityRepository, Repository } from "typeorm";
import Authority from "../entity/authority.entity";

@EntityRepository(Authority)
export class AuthorityRepository extends Repository<Authority> {}
