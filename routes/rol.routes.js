module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/rol.controller.js");
    
    router.post("/",controller.createRol);
    router.get("/",controller.listRol);

    router.get("/:id",controller.getRolById);
    router.delete("/:id",controller.deleteRol);



    app.use('/api/roles', router);
};