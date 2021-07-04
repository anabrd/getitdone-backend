const users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

exports.register = async (req, res) => {
    let newUser;
    await bcrypt.hash(req.body.pass, 10, function(err, hash) {
        if (err) {
            console.log(err)
        } else {
            newUser = new users({email: req.body.email, pass: hash});
            console.log("new user", newUser);
            // Check if user already exists
            users.findOne({email: req.body.email}, (err, doc) => {
            if (err) {
                res.send({status: "failed", message: "An error occurred. Please try again later."})
            } else if (doc !== null) {
                res.send({status: "failed", message: "There is already an account registered with this email."})
            } else {
                newUser.save((err, doc) => {
                    if (err) {
                        res.send({status: "failed", message:"Something went wrong."})
                    } else {
                        res.send({status: "success", message:"The account was created successfully."})
                    }
                })
            }
        })
    }})
}

exports.login = (req, res) => {

    let {email, pass} = req.body;
    users.findOne({email: req.body.email}, async (err, doc) => {    
        if (err) {
            res.send({status: "failed", message: "An error occurred. Please try again later."});
        } else if (doc == null) {
            res.send({status: "failed", message: "Wrong email and/or password."});
        } else {
            // Create jwt
            const match = await bcrypt.compare(pass, doc.pass);

            if (match)  {
                //Create the token and send to FE
                const token = jwt.sign({id:doc._id}, jwtSKey, {expiresIn: '1d'});
                console.log("token", token)
                console.log(doc);
                res.send(({status:'success', message: 'User logged in successfully', data: token}));
            } else {
                res.send({status:'failed', message: `Wrong email and/or password.`});
            }
        }
    })
}