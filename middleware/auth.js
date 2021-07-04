const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

exports.checkAuth = async (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if (!token) {
        res.status(401).send({status: "failed", message:"Absent token."});
    } else {
        try {
            await jwt.verify(token, jwtSKey, (fail, decodedPayLoad) => {
                if (fail) {
                    res.status(401).send({status: "failed", message: "Invalid token."});
                } else {
                    req.userId = decodedPayLoad.id;
                    console.log("user id in middlwwre", req.userId);
                    console.log("successful auth")
                    next();
                }
            })
        } catch (err) {
            console.log(err);
            res.send({status: "failed", message:"Unauthorized."})
        }
    }
}