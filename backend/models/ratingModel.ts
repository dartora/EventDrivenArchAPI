import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Driver } from './driverModel'; // Import the Driver model

@Table({
  tableName: 'ratings', // The name of the table in the database
  timestamps: true,     // Adds createdAt and updatedAt timestamps
})
export class Rating extends Model<Rating> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  ID!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0, max: 5 }, // Rating range (0 to 5 STARS)
  })
  STARS!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  COMMENT!: string;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  DRIVER_ID!: number;

  @BelongsTo(() => Driver)
  DRIVER!: Driver;
} 