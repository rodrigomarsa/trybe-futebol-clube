import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

export default class Matches extends Model<InferAttributes<Matches>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
}

Matches.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeamId: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.belongsTo(Matches, { foreignKey: 'home_team_id', as: 'homeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'away_team_id', as: 'awayTeam' });
