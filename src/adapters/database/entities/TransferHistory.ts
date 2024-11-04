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

  @Column({ type: 'int' })
  public receiverId: number;

  @Column({ type: 'int' })
  public senderId: number;

  @Column({ type: 'decimal' })
  public amount: number;

  @Column({ type: 'boolean' })
  public success: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public transferAt: Date;
}
