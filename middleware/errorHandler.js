const {logEvents} = require('./logger')

const errorHandler = (err, req, res ,next) => {
    logEvents(`${err.name} : ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'error.log');
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode !== 200 ?  res.statusCode : 500  : 500// Server Error

    res.status(status);
    res.json({message: err.message})

}

module.exports = errorHandler;