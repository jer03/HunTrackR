const { Application } = require('../models');

const getAll = async (req, res, next) => {
    try {
        const apps = await Application.findAll({
            where: { userId: req.user.id },
            order: [['dateApplied', 'DESC']]
        });
        res.json(apps);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const app = await Application.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!app) return res.status(404).json({ error: 'Not found' });
        res.json(app);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const data = { ...req.body, userId: req.user.id };
        const app = await Application.create(data);
        res.status(201).json(app);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const [count] = await Application.update(req.body, {
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!count) return res.status(404).json({ error: 'Not found or no changes' });
        const updated = await Application.findByPk(req.params.id);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const count = await Application.destroy({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
