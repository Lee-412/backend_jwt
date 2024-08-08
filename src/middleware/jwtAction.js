import jwt, { decode } from 'jsonwebtoken';
require("dotenv").config();

const createJWT = (payload) => {
    let token = null;

    try {
        let key = process.env.JWT_SECRET;

        token = jwt.sign(
            payload,
            key
        );
        console.log("check token", token);
    } catch (error) {
        console.log("check error create jwt", error);
    }
    return token;

}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);

    }
    return data;

}

module.exports = {
    createJWT,
    verifyJWT
}