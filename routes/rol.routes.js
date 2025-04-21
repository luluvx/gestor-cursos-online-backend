module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/rol.controller.js");



    app.use('/api/roles', router);
};