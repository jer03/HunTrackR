const { Application } = require('../models');
const { Op } = require('sequelize');

exports.getSummary = async (req, res, next) => {
    try {
        const userId = req.user.id;


        const total = await Application.count({
            where: { userId }
        });


        const interviews = await Application.count({
            where: {
                userId,
                stage: { [Op.iLike]: '%interview%' }
            }
        });


        const offers = await Application.count({
            where: {
                userId,
                stage: { [Op.iLike]: '%offer%' }
            }
        });

        res.json({ total, interviews, offers });

    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
};
