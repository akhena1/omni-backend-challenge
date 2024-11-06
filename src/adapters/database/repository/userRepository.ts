import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from '../entities/User';
import { CreateUserBodyParamsDto } from 'src/domain/dto/createUserBodyParams.dto';

export default class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async create(payload: CreateUserBodyParamsDto): Promise<UserEntity | null> {
    return this.userRepository.save(payload);
  }

  async findAll(): Promise<UserEntity[] | null> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(userId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async setBalance({
    receiverId,
    senderId,
    amount,
  }: {
    receiverId: string;
    senderId: string;
    amount: number;
  }): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const receiver = await queryRunner.manager.findOne(UserEntity, {
        where: { userId: receiverId },
      });
      const sender = await queryRunner.manager.findOne(UserEntity, {
        where: { userId: senderId },
      });

      const receiverNewBalance = Number(receiver.balance) + Number(amount);
      const senderNewBalance = Number(sender.balance) - Number(amount);

      await queryRunner.manager.update(
        UserEntity,
        { userId: receiverId },
        {
          balance: receiverNewBalance,
        },
      );
      await queryRunner.manager.update(
        UserEntity,
        { userId: senderId },
        {
          balance: senderNewBalance,
        },
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
