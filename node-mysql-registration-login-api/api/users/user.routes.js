const express = require('express');
const router = express.Router();
const usercontroller = require('./users.controller');
const userauthorize = require('../../_middleware/authorize');
const uservalidation = require('../users/user.validation');
const authorize = require('../../_middleware/authorize');


// routes
router.post('/authenticate', uservalidation.authenticateSchema, usercontroller.authenticate);
router.post('/register',uservalidation.registerSchema, usercontroller.register);
router.get('/userslist',usercontroller.getAll);
router.get('/current', usercontroller.getCurrent);
router.get('/', authorize, usercontroller.getById);
router.put('/', authorize , uservalidation.updateSchema , usercontroller.update);
router.delete('/', authorize, usercontroller.delete);

module.exports = router;


/* 
// routes
router.post('/authenticate', uservalidation.registerSchema, usercontroller.authenticate);
router.post('/register',uservalidation.registerSchema, usercontroller.register);
router.get('/', authorize, usercontroller.getAll);
router.get('/current',userauthorize, usercontroller.getCurrent);
router.get('/:id',userauthorize, usercontroller.getById);
router.put('/:id',userauthorize,uservalidation.updateSchema, usercontroller.update);
router.delete('/:id',userauthorize, usercontroller.delete); */