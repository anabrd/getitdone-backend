const logModel = require('../model/logs');

exports.logger = (req, res, next) => {

    console.log(req.originalUrl);
    const log = new logModel({
        dateTime: Date.now(),
        path: req.originalUrl
    });

    log.save((err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).send({status: "failed", message: "Please try again.", data: err})
        } else {
            req.logId = doc._id;
            next();
        }
    })
}