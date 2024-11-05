import { UserEntity } from 'src/adapters/database/entities/User';

export abstract class IUserRepository {
  abstract create(payload: Partial<UserEntity>): Promise<UserEntity | null>;
  abstract findOneByUsername(username: string): Promise<UserEntity | null>;
}
