// import express, body-parser and cors

// building Rest APIs
const express = require("express");

// help to parse the request and create the request.body object
const bodyParser = require("body-parser");

// middleware to protect api
const cors = require("cors");

// define app framework
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple API request
app.get("/v1/get-root", (request, response) => {

    response.json({
        message: "Your first API Request"
    });

});

// addition api
// assignment
app.get("/v1/add-numbers", (request, response) => {
  // get the number a
  // get the number b

  // add a + b = c

  // return c

});

app.get("/v1/get-root-param", (request, response) => {
    const id_ = request.query.id;
    const number_a = request.query.a;
    console.log("Params A :- "+ request.query.a);
    console.log("Params ID :- "+ request.query.id);
    if(!id_){
        // Invalid request if ID param isnt included
        response.status(400).send({
            message: "ID Param not passed, please pass required parameter",
            status: "Error",
            status_code: 400
        });

        return;
    
    }else if (id_ == 100){
        // Valid request if ID is 100
        response.json({
            message: "Valid ID",
            status: "Success",
            status_code: 200
        });
    
        return;
    }else{
        // Invalid request if ID is not 100
        response.status(400).send({
            message: "Invalid ID",
            status: "Error",
            status_code: 400
        });

        return;
    }
});


// import models

// create tables of they dont exist
const db = require("./models");
db.sequelize_me.sync();

// define other routes
require("./routes/student.routes")(app);
require("./routes/staff.routes")(app);

// define port the project will run on
// const PORT = process.env.PORT;
const PORT = 8085;

// Listen to Port
app.listen(PORT, () => {
    console.log(`Server successfully started at port - ${PORT}.`);
});

