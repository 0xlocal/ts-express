import { getConnection } from "typeorm";
import { RoleRepository } from "../repository/role.repository";
import { Role } from "../entity/role.entity";
import HttpException from "../exception/http.exception";

export class RoleService {
  private readonly roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = getConnection().getCustomRepository(RoleRepository);
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
    const updatedRole = await this.roleRepository.update(id, role);

    return updatedRole;
  };

  public delete = async (id: number) => {
    const deletedRole = await this.roleRepository.softDelete(id);

    if (!deletedRole.affected) {
      throw new HttpException(404, `Role with id ${id} not found`);
    }
  };
}
