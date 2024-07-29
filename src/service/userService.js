import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index'
import { where } from 'sequelize/lib/sequelize';


const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const createNewUser = async (email, password, username) => {
    let hashpass = hashUserPassWord(password);

    try {
        await db.User.create({
            email: email,
            password: hashpass,
            username: username
        })
    } catch (err) {
        console.error('Error creating user:', err);
    }

}

const getUserList = async () => {

    //test relationship 
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "phone", "sex", "address"],
        include: {
            model: db.Group,
            attributes: ["id", "name", "description"],
        },
        raw: true,
        nest: true
    })

    // let userRole = await db.Group.findAll({
    //     where: { id: newUser.Group.id },
    //     include: db.Role,
    //     raw: true,
    //     nest: true
    // })

    let userRole = await db.Role.findAll({

        include: {
            model: db.Group,
            where: { id: newUser.Group.id }
        },
        raw: true,
        nest: true
    })

    console.log("check role User ", userRole);
    console.log("check User", newUser);


    let user = []
    try {
        user = await db.User.findAll()
        return user;
    } catch (err) {
        console.error('Error fetching user list:', err);
        return user;
    }
}

const deleteUser = async (userIndex) => {

    try {
        await db.User.destroy({
            where: { id: userIndex }
        });
    } catch (err) {
        console.error('Error deleting user:', err);

    }

}
const getUserById = async (userIndex) => {
    let user = {}
    try {
        user = await db.User.findOne({ where: { id: userIndex } });
        return user.get({ plain: true });
    } catch (err) {
        console.error('Error deleting user:', err);
        return results;
    }

}
const updateUserInfor = async (email, username, userIndex) => {
    try {
        await db.User.update({
            email: email,
            username: username,
        },
            {
                where: {
                    id: userIndex,
                },
            },
        );

    } catch (err) {
        console.error('Error update user:', err);
    }

}

export default {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}
