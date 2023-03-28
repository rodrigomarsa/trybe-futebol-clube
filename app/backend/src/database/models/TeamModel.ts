import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';

export default class Teams extends Model<InferAttributes<Teams>> {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
