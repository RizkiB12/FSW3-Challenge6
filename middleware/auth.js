const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';
const {
    Superadmin,
    Admin,
    User
} = require('../models');


async function superadminAuth(req, res, next) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, secretKey);
        if (payload.role !== 'superadmin') {
         throw new Error();
        }
        req.user = payload.user;
        next();

    } catch (error) {
        res.status(401).send({
            message: 'Unauthorized'
        });

    }
}

async function adminAuth(req, res, next) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, secretKey);
        if (payload.role !== 'admin' || payload.role !== 'superadmin') {
         throw new Error();
        }
        req.user = payload.user;
        next();

    } catch (error) {
        res.status(401).send({
            message: 'Unauthorized'
        });

    }
}

async function auth(req, res, next) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, secretKey);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(401).send({
            message: 'Unauthorized'
        });
}
};


module.exports = {
    superadminAuth,
    adminAuth,
    auth
}