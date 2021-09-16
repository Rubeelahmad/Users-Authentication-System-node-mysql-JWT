
const Joi = require('joi');
const userService = require('./user.service');

const controller = {}

controller.authenticate = (req, res, next) => {
    
    userService.authenticate(req.body)
    .then((result) => {
        res.status(result.code).send(result)
     })
     .catch(error => {
         res.status(error.code).send(error)
     });
}



controller.register = (req, res, next) => {
    userService.create(req.body)
        .then((result) => {
           res.status(result.code).send(result)
        })
        .catch(error => {
            res.status(error.code).send(error)
        });
}

controller.getAll = (req, res, next) => {
    userService.getAll()
    .then((result) => {
       res.status(result.code).send(result)
    })
    .catch(error => {
        res.status(error.code).send(error)
    });
}

controller.getCurrent = (req, res, next) => {
    res.json(req.user);
}

controller.getById = (req, res, next) => {
    userService.getById(req.body.user_id)
    .then((result) => {
       res.status(result.code).send(result)
    })
    .catch(error => {
        res.status(error.code).send(error)
    });
    /* userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next); */
}

controller.update = (req, res, next) => {
    userService.update(req.body.user_id , req.body)
        .then((result) => {
           res.status(result.code).send(result)
        })
        .catch(error => {
            res.status(error.code).send(error)
        });

          /*   userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next); */
}


controller.delete = (req, res, next) =>{
    userService.delete(req.body.user_id)
    .then((result) => {
       res.status(result.code).send(result)
    })
    .catch(error => {
        res.status(error.code).send(error)
    });
}

module.exports = controller;

