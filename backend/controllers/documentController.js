const { Document, Application } = require('../models');

exports.getByApplication = async (req, res, next) => {
    try {

        const app = await Application.findOne({
            where: { id: req.params.appId, userId: req.user.id }
        });
        if (!app) return res.status(404).json({ error: 'Application not found' });

        const docs = await Document.findAll({ where: { applicationId: app.id } });
        res.json(docs);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        console.log('createDoc controller hit');
        console.log('file:', req.file);
        console.log('applicationId:', req.params.appId);

        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });


        const app = await Application.findOne({
            where: { id: req.params.appId, userId: req.user.id }
        });
        if (!app) return res.status(404).json({ error: 'Application not found' });

        const doc = await Document.create({
            originalName: req.file.originalname,
            filePath: req.file.originalname,
            type: req.file.mimetype,
            applicationId: app.id
        });

        res.status(201).json(doc);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {

        const doc = await Document.findOne({
            where: { id: req.params.id },
            include: {
                model: Application,
                where: { userId: req.user.id }
            }
        });
        if (!doc) return res.status(404).json({ error: 'Document not found' });

        await doc.destroy();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
