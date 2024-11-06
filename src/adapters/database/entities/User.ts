import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column({ type: 'varchar' })
  public username: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @Column({ type: 'decimal', default: 0, precision: 12, scale: 2 })
  public balance?: number;

  @Column({ type: 'boolean', default: true })
  public availableToTransfer?: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
