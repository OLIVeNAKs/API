module.exports = app => {

    // import staff controller
    const staff_logic = require("../controllers/staff.controller.js");

    // import express router
    var router = require("express").Router();

    // create staff api route
    router.post("/add", staff_logic.create);

    // retrieve all staff api route
    // http://localhost:8085/staff/retrieve
    router.get("/retrieve", staff_logic.retrieve_staff);

    // update a staff member by ID API route
    // http://localhost:8085/staff/update/:id
    router.put("/update/:id", staff_logic.update);

    // delete a staff member by ID API route
    http://localhost:8085/staff/delete/:id
    router.delete("/delete/:id", staff_logic.delete);

    // define default route of staff
    app.use('/staff', router);

}
// http://localhost:8085/staff/add