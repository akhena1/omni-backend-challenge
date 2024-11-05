import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginTrackerEntity } from '../entities/LoginTracker';
import { ILoginTrackerRepository } from 'src/domain/interfaces/repository/ILoginTrackerRepository';
import { CreateLoginTrackDto } from 'src/domain/dto/createLoginTrack.dto';

export default class LoginTrackerRepository implements ILoginTrackerRepository {
  constructor(
    @InjectRepository(LoginTrackerEntity)
    private readonly loginTrackerRepository: Repository<LoginTrackerEntity>,
  ) {}

  async create(
    payload: CreateLoginTrackDto,
  ): Promise<LoginTrackerEntity | null> {
    return this.loginTrackerRepository.save(payload);
  }
}
