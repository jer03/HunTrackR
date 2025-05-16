const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class ApplicationTag extends Model { }

ApplicationTag.init({
  applicationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  tagId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'ApplicationTag',
  tableName: 'application_tags',
  timestamps: false,
});

module.exports = ApplicationTag;
