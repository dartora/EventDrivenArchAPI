import { Table, Column, Model, DataType } from 'sequelize-typescript';
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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descricao!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  carro!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    defaultValue: null,
    validate: { min: 0, max: 5 }, // Avaliação range (0 to 5 stars)
  })
  avaliacao!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  taxaKm!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  minimo!: number;
}
