const { startSession } = require("mongoose");

const errorMiddleware = (err, req, res, next) => {
    console.log('O erro está no middleware');
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null})
}

module.exports = errorMiddleware;