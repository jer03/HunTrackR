const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Document extends Model { }

    Document.init({
        originalName: DataTypes.STRING,
        filePath: DataTypes.STRING,
        type: DataTypes.STRING,
        applicationId: DataTypes.INTEGER
    }, { sequelize, modelName: 'Document' });

    return Document;
};
