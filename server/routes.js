/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

    // Insert routes below
    app.use('/api/exec-board', require('./api/exec-board'));
    app.use('/api/cloudinary', require('./api/cloudinary'));
    app.use('/api/photos', require('./api/photo'));
    app.use('/api/photo', require('./api/photo'));
    app.use('/api/exec-positions', require('./api/exec-position'));
    app.use('/api/exec-members', require('./api/exec-member'));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
