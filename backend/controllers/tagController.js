const { Tag } = require('../models');

const getTags = async (req, res, next) => {
    try {
        const tags = await Tag.findAll({ order: [['name', 'ASC']] });
        res.json(tags);
    } catch (err) {
        next(err);
    }
};

const createTag = async (req, res, next) => {
    try {
        const tag = await Tag.create({ name: req.body.name });
        res.status(201).json(tag);
    } catch (err) {
        next(err);
    }
};

const removeTag = async (req, res, next) => {
    try {
        const count = await Tag.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTags,
    createTag,
    removeTag
};
