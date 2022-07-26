const jwt = require("jsonwebtoken");


const isLogged = async(req, res, next)=>{

    try {
        const userToken = req.headers['x-token'];
        if(!userToken) Promise.reject();

        const verifyToken = await jwt.verify(userToken, process.env.PRIVATE_KEY);
        if(verifyToken) Promise.reject();

        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}

module.exports = isLogged;