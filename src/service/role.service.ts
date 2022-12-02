import { getConnection } from "typeorm";
import { RoleRepository } from "../repository/role.repository";
import { Role } from "../entity/role.entity";
import HttpException from "../exception/http.exception";
import { AuthorityRepository } from "../repository/authority.repository";

export class RoleService {
  private readonly roleRepository: RoleRepository;
  private readonly authorityRepository: AuthorityRepository;

  constructor() {
    this.roleRepository = getConnection().getCustomRepository(RoleRepository);
    this.authorityRepository =
      getConnection().getCustomRepository(AuthorityRepository);
  }

  public index = async () => {
    const roles = await this.roleRepository.find();

    return roles;
  };

  public getOne = async (id: number) => {
    const role = await this.roleRepository.findOne(id);

    return role;
  };

  public create = async (role: Role) => {
    const newRole = await this.roleRepository.save(role);

    return newRole;
  };

  public update = async (role: Role, id: number) => {
    if (!role.id) {
      role.id = id;
    }

    const NewAuthority = await this.authorityRepository.findByIds(
      role.authorityIds
    );

    if (NewAuthority) {
      role.authorities = NewAuthority;
    }

    const updatedRole = await this.roleRepository.save(role);

    return updatedRole;
  };

  public delete = async (id: number) => {
    const deletedRole = await this.roleRepository.softDelete(id);

    if (!deletedRole.affected) {
      throw new HttpException(404, `Role with id ${id} not found`);
    }
  };
}
