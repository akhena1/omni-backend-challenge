import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transferHistory' })
export class TransferHistoryEntity {
  @PrimaryGeneratedColumn('increment')
  public transferId: number;

  @Column({ type: 'int' })
  public receiverId: number;

  @Column({ type: 'int' })
  public senderId: number;

  @Column({ type: 'float' })
  public amount: number;

  @Column({ type: 'boolean' })
  public success: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public transferAt: Date;
}
