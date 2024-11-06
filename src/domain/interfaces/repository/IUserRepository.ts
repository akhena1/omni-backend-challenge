import { UserEntity } from 'src/adapters/database/entities/User';

export abstract class IUserRepository {
  abstract create(payload: Partial<UserEntity>): Promise<UserEntity | null>;
  abstract findOneByUsername(username: string): Promise<UserEntity | null>;
  abstract findOneById(userId: string): Promise<UserEntity | null>;
  abstract setBalance(payload: {
    receiverId: string;
    senderId: string;
    amount: number;
  }): Promise<void>;
}
