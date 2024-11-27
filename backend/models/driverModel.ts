import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Rating } from './ratingModel'; 

@Table({
  tableName: 'drivers', // The name of the table in the database
  timestamps: true,     // Adds createdAt and updatedAt timestamps
})
export class Driver extends Model<Driver> {
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
  NAME!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  DESCRIPTION!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  CAR!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  TAXA_KM!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  MINIMO!: number;

  @HasMany(() => Rating)
  ratings!: Rating[];
}
