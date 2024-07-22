import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from 'config/database';

interface InventoryAttributes {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface InventoryCreationAttributes
  extends Optional<InventoryAttributes, 'id'> {}

class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes
{
  public id!: number;
  public name!: string;
  public category!: string;
  public price!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'inventory',
    sequelize,
  },
);

export default Inventory;
