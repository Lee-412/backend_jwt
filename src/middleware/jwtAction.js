import e from 'express';
import jwt, { decode } from 'jsonwebtoken';
require("dotenv").config();

const nonSecurePaths = ['/', '/register', '/login'];

const createJWT = (payload) => {
    let token = null;

    try {
        let key = process.env.JWT_SECRET;

        token = jwt.sign(
            payload,
            key,
            {
                expiresIn: process.env.JWT_EXPIRESIN
            }
        );
        // console.log("check token", token);
    } catch (error) {
        console.log("check error create jwt", error);
    }
    return token;

}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log("verify JWT error", error);

    }
    return decoded;

}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    if (cookies && cookies.access_token) {
        let token = cookies.access_token;
        let decode = verifyJWT(token);
        if (decode) {
            req.user = decode;
            next();
        }
        else {
            return res.status(401).json({
                EM: 'Not authenticated the user',
                EC: -1,
                DT: ''
            })
        }
    }
    else {
        console.log("no cookie");
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })

    }
}
const checkUserPermission = (req, res, next) => {

    if (nonSecurePaths.includes(req.path)) return next();

    if (req.user) {
        let email = req.user.email;
        let roles = req.user.role.Roles;
        console.log(roles);

        if (!roles || roles.length === 0) {
            return res.status(401).json({
                EM: "Unauthorized the user. Please login...",
                EC: -1,
                DT: ''
            })
        }

        let currentURL = req.path;

        let canAccess = roles.some(item => item.url == currentURL);
        console.log(currentURL);

        if (canAccess === true) {
            next();
        }
        else {
            return res.status(401).json({
                EM: "you don't have  permission to access this resource or perform this action.",
                EC: -1,
                DT: ''
            })
        }
    }
    else {
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })
    }
}
module.exports = {
    createJWT,
    verifyJWT,
    checkUserJWT,
    checkUserPermission
}