const sequelize = require('../config/database');
const User = require('./User');
const Application = require('./Application');
const Tag = require('./Tag');
const Document = require('./Document')(sequelize);
const ApplicationTag = require('./ApplicationTag');


User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });


Application.belongsToMany(Tag, {
    through: ApplicationTag,
    foreignKey: 'applicationId'
});
Tag.belongsToMany(Application, {
    through: ApplicationTag,
    foreignKey: 'tagId'
});


Application.hasMany(Document, { foreignKey: 'applicationId' });
Document.belongsTo(Application, { foreignKey: 'applicationId' });

const initModels = async () => {
    await sequelize.sync({ alter: true });
    console.log('All models & associations synced.');
};

module.exports = {
    sequelize,
    initModels,
    User,
    Application,
    Tag,
    Document,
    ApplicationTag
};
