'use strict';

var express = require('express'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config');

var cloudinary = require('cloudinary'), fs = require('fs');

/**
 * Express configuration
 */
module.exports = function (app) {
    var env = app.get('env');

    if ('development' === env) {
        app.use(require('connect-livereload')());

        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.set('views', config.root + '/app/views');
        cloudinary.config({
            cloud_name: 'umich-adpi',
            api_key: '974991525828391',
            api_secret: 'gFKfOJ8C7X6OEp7KYWuX2EOR-yM'
        });
    }

    if ('production' === env) {
        app.use(compression());
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('views', config.root + '/views');
        cloudinary.config({
            cloud_name: 'umich-adpi',
            api_key: '974991525828391',
            api_secret: 'gFKfOJ8C7X6OEp7KYWuX2EOR-yM'
        });
    }

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(methodOverride());

    app.locals.api_key = cloudinary.config().api_key;
    app.locals.cloud_name = cloudinary.config().cloud_name;

    // Error handler - has to be last
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
};