// import models
const db = require("../models");

// import Sequelize Staff model
const Staff = db.staff;

// sequelize clause
const Op = db.Sequelize.Op;

// Creates and Saves a new Staff
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

    // check if staff already exists
    Staff.findOne({
        where: {
            phonenumber: req.body.phonenumber
        }
    })
        .then(existingStaff => {
            if (existingStaff) {
                res.status(409).send({
                    status: "Error",
                    status_code: 409,
                    message: "Staff with the given phone number already exists."
                });
                return;
            }

            // create staff object
            const add_staff = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                phonenumber: req.body.phonenumber
            };

            // pass staff object to Sequelize Create function
            Staff.create(add_staff)
                .then(data => {
                    res.send({
                        status: "Success",
                        status_code: 200,
                        data: data
                    });
                })
                .catch(err => {
                    res.status(400).send({
                        status: "Error",
                        status_code: 400,
                        message: err.message || "Error occurred while adding Staff."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 500,
                message: err.message || "Error occurred while checking Staff existence."
            });
        });
};





// Retrieves all staff
exports.retrieve_staff = (req, res) => {
    const first_name = req.query.first_name;
    // {first_name: "Sa"}
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}` } } : null;

    Staff.findAll({ where: condition })
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
                message: err.message || "Error occurred while retrieving staff"
            });
        });
};

// Update a Staff by ID
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

    // create staff object with updated values
    const update_staff = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        phonenumber: req.body.phonenumber
    };

    // Fetch the existing staff data from the database
    Staff.findByPk(id)
        .then(staff => {
            if (!staff) {
                res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Staff with id=${id} not found.`
                });
                return;
            }

            // Compare the updated data with the existing data
            const isDataChanged = Object.keys(update_staff).some(key => staff[key] !== update_staff[key]);

            if (!isDataChanged) {
                // No changes were made to the staff data
                res.send({
                    status: "Info",
                    status_code: 200,
                    message: "No changes were made to the staff data."
                });
                return;
            }

            // Update the staff data
            staff.update(update_staff)
                .then(() => {
                    // Success message
                    res.send({
                        status: "Success",
                        status_code: 200,
                        message: "Staff was updated successfully."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        status: "Error",
                        status_code: 500,
                        message: err.message || "Error occurred while updating Staff."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 500,
                message: err.message || "Error occurred while fetching Staff data."
            });
        });
};

// Delete a Staff by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    // Check if the staff exists before attempting to delete
    Staff.findByPk(id)
        .then(staff => {
            if (!staff) {
                // Error message if the staff was not found
                res.status(404).json({
                    status: "Error",
                    status_code: 404,
                    message: `Cannot delete Staff with id=${id}. Staff not found!`
                });
                return;
            }

            // Delete the staff
            Staff.destroy({ where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        // Success message
                        res.json({
                            status: "Success",
                            status_code: 200,
                            message: "Staff was deleted successfully!"
                        });
                    } else {
                        // Error message if the staff was not found
                        res.json({
                            status: "Error",
                            status_code: 400,
                            message: `Cannot delete Staff with id=${id}. Staff not found!`
                        });
                    }
                })
                .catch(err => {
                    // Return error on failure
                    res.status(400).json({
                        status: "Error",
                        status_code: 400,
                        message: err.message || "Error occurred while deleting Staff."
                    });
                });
        })
        .catch(err => {
            // Return error if there was an issue fetching staff data
            res.status(500).json({
                status: "Error",
                status_code: 500,
                message: err.message || "Error occurred while fetching Staff data."
            });
        });
};


