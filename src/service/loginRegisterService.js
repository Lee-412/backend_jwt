import db from "../models/index"
import bcrypt from 'bcryptjs';
import Op from "sequelize/lib/operators";
import { getGroupWithRole } from './JWTService'
import { createJWT } from '../middleware/jwtAction'
const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const checkEmailExists = async (data) => {

    const user = await db.User.findOne({
        where: {
            email: data
        }
    });

    if (user) {
        return true;
    }
    else {
        return false;
    }

}

const checkPhoneExists = async (data) => {

    const user = await db.User.findOne({
        where: {
            phone: data
        }
    });

    if (user) {
        return true;
    }
    else {
        return false;
    }

}
const registerNewUser = async (rawUserData) => {

    try {

        // check email, phone number are exist
        let isEmailExists = await checkEmailExists(rawUserData.email, 'email');
        if (isEmailExists === true) {
            console.log('email is exitsts');
            return {
                EM: 'The Email is already exists',
                EC: '-1',
                DT: 'not found'

            };
        }
        let isPhoneExists = await checkPhoneExists(rawUserData.phone, 'phone');
        if (isPhoneExists === true) {
            console.log('phone is exitsts');

            return {
                EM: 'The phone number is already exists',
                EC: '-1',
                DT: 'not found'

            };
        }

        // hash password
        let hashPassWord = hashUserPassWord(rawUserData.password)

        // create new user

        await db.User.create({
            email: rawUserData.email,
            password: hashPassWord,
            username: rawUserData.username,
            phone: rawUserData.phone,
            sex: rawUserData.sex,
            address: rawUserData.address,
            groupId: 3
        })


        return {
            EM: 'Create user succesfully',
            EC: '0',
            DT: '',
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something wrong is service',
            EC: '-2',
            DT: 'not found'
        }
    }


}



const loginUser = async (rawUserData) => {

    try {
        let user = {};

        let dataUser = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.userLogin },
                    { phone: rawUserData.userLogin }
                ]
            }
        });
        if (dataUser) {
            user = dataUser.get({ plain: true })
            console.log("chekc user email", user);

            // check hash password
            // let hashPassWord = hashUserPassWord(rawUserData.password)

            const match = await bcrypt.compare(rawUserData.password, user.password);

            if (match) {

                let roles = await getGroupWithRole(user);

                let payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    role: roles,
                    expiresIn: process.env.JWT_EXPIRESIN
                }

                const jwt = createJWT(payload)
                return {
                    EM: 'Login user succesfully',
                    EC: '0',
                    DT: {
                        access_token: jwt,
                        data: roles
                    },
                }
            }
            else {
                return {
                    EM: 'Incorrect account or password',
                    EC: '-1',
                    DT: '',
                }
            }

        }
        else {
            return {
                EM: 'Incorrect account or password',
                EC: '-1',
                DT: ''
            }
        }



    } catch (err) {
        console.log(err);
        return {
            EM: 'Something wrong is service',
            EC: '-2',
            DT: 'not found loginRegisterService'
        }
    }


}

module.exports = {
    registerNewUser,
    loginUser,
}