'use strict';

var express = require('express');
var controller = require('./cloudinary.controller');

var router = express.Router();

router.get('/', controller.getImages);

router.get('/tag/:tag', controller.getByTag);

module.exports = router;