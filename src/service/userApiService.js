import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index'


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

const handleCreateNewUser = async (rawUserData) => {

    try {
        console.log("check raw data", rawUserData);

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

        let hashpass = hashUserPassWord(rawUserData.password);
        console.log('check password', hashpass);

        const create = await db.User.create({
            email: rawUserData.email,
            password: hashpass,
            username: rawUserData.username,
            phone: rawUserData.phone,
            address: rawUserData.address,
            sex: rawUserData.sex,
            groupId: rawUserData.groupId
        })

        console.log("check create user", create);

        return {
            EM: 'create user successfully',
            EC: '0',
            DT: create.get({ plain: true }),
        }

    } catch (err) {
        console.log('Error creating user:', err);
        return {
            EM: 'something wrong in server',
            EC: '2',
            DT: '',
        }
    }

}

const handleGetUserList = async () => {

    try {
        let listUser = []

        listUser = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            raw: true,
            nest: true
        })
        console.log("check get user list", listUser);

        if (listUser) {
            console.log("chekc user email", listUser);
            return {
                EM: 'get user Successfully',
                EC: '0',
                DT: listUser
            }

        }
        else {
            return {
                EM: 'get data success',
                EC: '0',
                DT: ''
            }
        }


    } catch (err) {
        console.log(err);

        return {
            EM: 'Something wrong in server',
            EC: '2',
            DT: '',
        }
    }
}

const handleDeleteUser = async (userIndex) => {

    try {
        const data = await db.User.destroy({
            where: { id: userIndex }
        });
        console.log("check delete data", data);
        if (data === '1') {
            return {
                EM: "delete user successfully",
                EC: '0',
                DT: '',
            }
        }
        else {
            return {
                EM: "User not found",
                EC: '1',
                DT: '',
            }
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        return {
            EM: "Something wrong in server",
            EC: '1',
            DT: '',
        }
    }

}
const getUserById = async (userIndex) => {
    let user = {}
    try {
        user = await db.User.findOne({

            where: { id: userIndex },
            attributes: ["id", "username", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            raw: true,
            nest: true
        });

        if (user) {
            console.log("check get user", user);

            return {
                EM: 'get user succesfully',
                EC: '0',
                DT: user
            }
        }
        else {
            return {
                EM: 'User not found',
                EC: '1',
                DT: ''
            }
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        return {
            EM: 'something wrong in server',
            EC: '2',
            DT: ''
        }
    }

}
const updateUserInfor = async (rawUserData) => {
    try {

        const editUser = await db.User.update({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            address: rawUserData.address,
            sex: rawUserData.sex,
            groupId: rawUserData.groupId
        },
            {
                where: {
                    id: rawUserData.id,
                },
            },
        );
        console.log("check edit user from server", editUser[0]);
        if (editUser[0] === 1) {
            return {
                EM: 'Edit user succesfully',
                EC: '0',
                DT: editUser
            }
        }
        else {
            return {
                EM: 'User not found',
                EC: '1',
                DT: editUser
            }
        }
    } catch (err) {
        console.error('Error update user:', err);
        return {
            EM: 'something wrong in server',
            EC: '2',
            DT: ''
        }
    }

}

const handleChangePassword = () => {

}

export default {
    handleCreateNewUser,
    handleGetUserList,
    handleDeleteUser,
    getUserById,
    updateUserInfor
}
