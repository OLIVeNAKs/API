module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define("staff", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        phonenumber: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
    });

    return Staff;
};






//module.exports = (sequelize_me, Sequelize) => {
    //const Staff = sequelize_me.define("staff", {
        //first_name: {
            //type: Sequelize.STRING
       // },
        //last_name: {
            //type: Sequelize.STRING
        //},
        //phone_number: {
            //type: Sequelize.STRING
        //},
        //gender: {
            //type: Sequelize.STRING
        //},
    //});

   // return Staff;
//}