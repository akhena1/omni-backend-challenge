import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/User';
import { CreateUserBodyParamsDto } from 'src/domain/dto/createUserBodyParams.dto';

export default class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserBodyParamsDto): Promise<UserEntity | null> {
    return this.userRepository.save(payload);
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}
