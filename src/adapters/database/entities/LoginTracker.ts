import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'loginTracker' })
export class LoginTrackerEntity {
  @PrimaryGeneratedColumn('uuid')
  public trackId: string;

  @Column({ type: 'varchar' })
  public userId: string;

  @Column({ type: 'varchar' })
  public ip: string;

  @CreateDateColumn({ type: 'timestamp' })
  public loginAt: Date;
}
