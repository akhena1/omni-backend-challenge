import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn('increment')
  public personId: number;

  @Column({ type: 'varchar' })
  public username: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @Column({ type: 'float' })
  public balance: number;

  @Column({ type: 'boolean' })
  public availableToTransfer: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
