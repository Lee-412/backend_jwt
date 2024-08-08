import e from 'express';
import userService from '../service/userService'


const handleCreateUser = async (req, res) => {
    try {
        let username = req.body.userName;
        let password = req.body.password;
        let email = req.body.emailName;

        await userService.createNewUser(email, password, username)
        return res.redirect('/user')

    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send("Error executing query");
    }
}

const handleUserPage = async (req, res) => {
    const dataUserList = await userService.getUserList();
    // console.log(dataUserList);
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    res.cookie("test", "test cookie123")
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    return res.render("user.ejs", { dataUserList })
}

const handleDeleteUser = async (req, res) => {
    // console.log(req.params.id);
    await userService.deleteUser(req.params.id);
    return res.redirect('/user')

}
const handleGetUpdateUser = async (req, res) => {
    // console.log(req.params.id);
    let id = req.params.id;
    let user = await userService.getUserById(id);

    let dataUser = {};
    dataUser = user;
    console.log("check config user", user, dataUser);
    return res.render("user-update.ejs", { dataUser })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;

    // console.log(email, username, id);
    await userService.updateUserInfor(email, username, id);

    return res.redirect('/user')
}
module.exports = {
    handleCreateUser,
    handleUserPage,
    handleDeleteUser,
    handleUpdateUser,
    handleGetUpdateUser
}