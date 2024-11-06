import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transferHistory' })
export class TransferHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  public transferId: string;

  @Column({ type: 'varchar' })
  public receiverId: string;

  @Column({ type: 'varchar' })
  public senderId: string;

  @Column({ type: 'decimal' })
  public amount: number;

  @Column({ type: 'boolean', default: true })
  public success?: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public transferAt: Date;
}
