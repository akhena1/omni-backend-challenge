import { LoginTrackerEntity } from 'src/adapters/database/entities/LoginTracker';

export abstract class ILoginTrackerRepository {
  abstract create(
    payload: Partial<LoginTrackerEntity>,
  ): Promise<LoginTrackerEntity | null>;
}
