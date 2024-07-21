const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const apiRouter = require("./routes/api.js");

const app = express();
const port = process.env.PORT || 3900;
const sequelize = new Sequelize(process.env.POSTGRES_URL);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.send("error");
});

// connect to postgres
async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDatabase();

app.listen(port, function() {
    console.log(`Server running on the port ${port}!🚀`);
})
