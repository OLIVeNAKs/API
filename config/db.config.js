module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "api_nodejs",
    dialect: "mysql",
    pool: {
        // maximum number of connections to db pool
        max: 5,
        // minimum number of connections to db pool 
        min: 0,
        // maximum time, in milliseconds, that the db pool tries to connect before it throws an error
        acquire: 30000,
        // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000

    }
}