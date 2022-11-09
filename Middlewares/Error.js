import ErrorHandler from '../Utils/ErrorHandler.js'

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.msg = err.msg || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message: err.msg
    });
}

