'use strict';

var express = require('express');
var controller = require('./photo.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/gallery', controller.gallery);
router.get('/:id', controller.show);
router.put('/:id/tag', controller.updateTags);
router.get('/tag/:tag', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/admin/:id', controller.adminUpdate);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;