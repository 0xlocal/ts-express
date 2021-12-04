import { AuthorityRepository } from "../repository/authority.repository";
import { getConnection } from "typeorm";
import Authority from "../entity/authority.entity";
import HttpException from "../exception/http.exception";

export class AuthorityService {
  private readonly authorityRepository: AuthorityRepository;

  constructor() {
    this.authorityRepository =
      getConnection().getCustomRepository(AuthorityRepository);
  }

  public index = async () => {
    return await this.authorityRepository.find();
  };

  public getOne = async (id: number) => {
    return await this.authorityRepository.findOne(id);
  };

  public create = async (authority: Authority) => {
    const newAuthority = await this.authorityRepository.save(authority);

    return newAuthority;
  };

  public update = async (authority: Authority, id: number) => {
    const updatedAuthority = await this.authorityRepository.update(
      id,
      authority
    );

    return updatedAuthority;
  };

  public delete = async (id: number) => {
    const deletedAuthority = await this.authorityRepository.delete(id);

    if (!deletedAuthority.affected) {
      throw new HttpException(404, `Authority with id ${id} not found.`);
    }
  };
}
