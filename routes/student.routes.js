module.exports = app => {

    // import student controller
    const students_logic = require("../controllers/student.controller.js");

    // import express router
    var router = require("express").Router();

    // create student api route
    router.post("/add", students_logic.create);


    // retrieve all student api route
    // http://localhost:8085/students/retrieve
    router.get("/retrieve", students_logic.retrieve_students);

    // update a student by ID API route
    // http://localhost:8085/students/update/:id
    router.put("/update/:id", students_logic.update);

    // delete a student by ID API route
    // http://localhost:8085/students/delete/:id
    router.delete("/delete/:id", students_logic.delete);
    

    // define default route
    app.use('/students', router);

}
// http://localhost:8085/students/add