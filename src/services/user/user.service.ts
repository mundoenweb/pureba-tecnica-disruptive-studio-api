import { inject, injectable } from 'inversify'
import { REPOSITORIES } from '../../containers/types'
import { UserEntity } from '../../entities/user.entity'
import { IUserRepository } from '../../repositories/users/user.repository.interface'
import { IUserService } from './user.service.interface'
import { IRolRepository } from '../../repositories/roles/rol.repository.interface'
import { RolException } from '../../errors/rol.exception'
import { RoleEntity } from '../../entities/role.entity'

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(REPOSITORIES.user)
    private readonly userRepository: IUserRepository,
    @inject(REPOSITORIES.rol)
    private readonly rolRepository: IRolRepository,
  ) {}

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne(id)
  }

  async findAll(data: Partial<UserEntity> = {}): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll(data)
    return users
  }

  async create(data: UserEntity): Promise<UserEntity> {
    let rol: RoleEntity | undefined
    try {
      const roles = await this.rolRepository.findAll()
      rol = roles.find((r) => r.name === data.rol)
      // rol = roles.find((r) => r.name === 'admin')
      if (!rol) throw new Error()
    } catch (error) {
      throw new RolException()
    }

    const newUser: UserEntity = {
      ...data,
      credits: 0,
      rol: rol.id,
    }
    const result = await this.userRepository.create(newUser)
    return result
  }

  async update(
    id: string,
    { credits, ...resData }: Partial<UserEntity>,
  ): Promise<UserEntity> {
    let currentCredits = 0

    if (credits) {
      const user = await this.userRepository.findOne(id)
      currentCredits += user?.credits ?? 0
    }

    const query: Partial<UserEntity> = {
      ...resData,
      ...(credits && { credits: credits + currentCredits }),
    }

    const result = await this.userRepository.update(id, query)
    return result as unknown as UserEntity
  }
}
