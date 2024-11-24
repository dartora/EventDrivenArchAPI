import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
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
  id!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0, max: 5 }, // Rating range (0 to 5 stars)
  })
  stars!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comment!: string;

  @ForeignKey(() => Driver) // Establish foreign key relationship
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driverId: number; // Reference to the Driver model
} 