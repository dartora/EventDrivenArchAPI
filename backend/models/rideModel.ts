import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Driver } from './driverModel';

@Table({
  tableName: 'rides',
  timestamps: true,
})
export class Ride extends Model<Ride> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  ID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ORIGIN_ADDRESS!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  DESTINATION_ADDRESS!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  DISTANCE!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  PRICE!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  USER_ID!: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  DRIVER_ID!: number;

  @BelongsTo(() => Driver)
  driver!: Driver;

  @Column({
    type: DataType.ENUM('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'PENDING',
  })
  STATUS!: string;
} 