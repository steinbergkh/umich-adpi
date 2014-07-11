'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execPosition = require('./controllers/exec-position'),
    execMember = require('./controllers/exec'),
    cloudinary = require('./controllers/cloudinary'),
    photo = require('./controllers/photos');

/**
 * Application routes
 */
module.exports = function (app) {

// Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomePositions);
    app.route('/api/exec/position')
        .get(execPosition.findAll)
        .post(execPosition.create);
    app.route('/api/exec/position/:id')
        .get(execPosition.findById)
        .post(execPosition.edit);

    app.route('/api/exec/member')
        .get(execMember.findAll)
        .post(execMember.create);
    app.route('/api/exec/member/:id')
        .get(execMember.findById)
        .post(execMember.edit);
    app.route('/api/photos')
        .get(cloudinary.getImages);
    app.route('/api/photos/:tag')
        .get(cloudinary.getByTag);
    app.route('/api/photos/tag/:tag')
        .get(cloudinary.getByTag);
    app.route('/api/photo/:id')
        .get(photo.getById)
        .post(photo.edit);
    app.route('/api/photo')
        .post(photo.create)
        .get(photo.getAll);

// All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

// All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(index.index);
};