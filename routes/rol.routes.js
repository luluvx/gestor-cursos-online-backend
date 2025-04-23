module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/rol.controller.js");
    
    router.post("/",controller.createRol);



    app.use('/api/roles', router);
};