// import models
const db = require("../models");

// import Sequelize Student model
const Student = db.students;

// sequelize clause
const Op = db.Sequelize.Op;

// Creates and Saves a new Student
exports.create = (req, res) => {
    // validate the request
    if (!req.body.first_name) {
        res.status(400).send({
            status: "Error",
            status_code: 400,
            message: "Fill in the First Name"
        });
        return;
    }

    // create student object
    const add_student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        class: req.body.class,
        physical_address: req.body.physical_address,
        status: req.body.status ? req.body.status : false
    };

    // pass student object to Sequelize Create function
    // Sequelize Create helps add object to DB
    Student.create(add_student)
        .then(data => {
            // return data on success
            res.send({
                status: "Success",
                status_code: 200,
                data: data
            });
        })
        .catch(err => {
            // return error on failure
            res.status(400).send({
                status: "Error",
                status_code: 400,
                message: err.message || "Error occurred while adding Student."
            });
        });
};

// Retrieves all students
exports.retrieve_students = (req, res) => {
    const first_name = req.query.first_name;
    
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}` } } : null;

    Student.findAll({ where: condition })
        .then(data => {
            res.send({
                status: "Success",
                status_code: 200,
                data: data
            });
        })
        .catch(err => {
            // response
            res.status(400).send({
                status: "Error",
                status_code: 400,
                message: err.message || "Error occurred while retrieving student"
            });
        });
};

// Update a Student by ID
exports.update = (req, res) => {
    const id = req.params.id;

    // validate the request
    if (!req.body.first_name) {
        res.status(400).send({
            status: "Error",
            status_code: 400,
            message: "Fill in the First Name"
        });
        return;
    }

    // Check if the ID is valid
    if (!isValidID(id)) {
        res.status(400).send({
            status: "Error",
            status_code: 400,
            message: "Invalid ID format"
        });
        return;
    }

    // create student object with updated values
    const update_student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        class: req.body.class,
        physical_address: req.body.physical_address,
        status: req.body.status ? req.body.status : false
    };

    // Fetch the existing student data from the database
    Student.findByPk(id)
        .then(student => {
            if (!student) {
                res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Student with id=${id} not found.`
                });
                return;
            }

            // Compare the updated data with the existing data
            const isDataChanged = Object.keys(update_student).some(key => student[key] !== update_student[key]);

            if (!isDataChanged) {
                // No changes were made to the student data
                res.send({
                    status: "Info",
                    status_code: 200,
                    message: "No changes were made to the student data."
                });
                return;
            }

            // Update the student data
            student.update(update_student)
                .then(() => {
                    // Success message
                    res.send({
                        status: "Success",
                        status_code: 200,
                        message: "Student was updated successfully."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        status: "Error",
                        status_code: 500,
                        message: err.message || "Error occurred while updating Student."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 500,
                message: err.message || "Error occurred while fetching Student data."
            });
        });
};

// Function to validate ID format
function isValidID(id) {
    // Implement your ID validation logic here
    // For example, check if it contains a mixture of numbers and letters
    const regex = /^[0-9a-zA-Z]+$/;
    return regex.test(id);
}




// Delete a Student by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    // Check if the student exists before attempting to delete
    Student.findByPk(id)
        .then(student => {
            if (!student) {
                // Error message if the student was not found
                res.status(404).json({
                    status: "Error",
                    status_code: 404,
                    message: `Cannot delete Student with id=${id}. Student not found!`
                });
                return;
            }

            // Delete the student
            Student.destroy({ where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        // Success message
                        res.json({
                            status: "Success",
                            status_code: 200,
                            message: "Student was deleted successfully!"
                        });
                    } else {
                        // Error message if the student was not found
                        res.json({
                            status: "Error",
                            status_code: 400,
                            message: `Cannot delete Student with id=${id}. Student not found!`
                        });
                    }
                })
                .catch(err => {
                    // Return error on failure
                    res.status(400).json({
                        status: "Error",
                        status_code: 400,
                        message: err.message || "Error occurred while deleting Student."
                    });
                });
        })
        .catch(err => {
            // Return error if there was an issue fetching student data
            res.status(500).json({
                status: "Error",
                status_code: 500,
                message: err.message || "Error occurred while fetching Student data."
            });
        });
};


