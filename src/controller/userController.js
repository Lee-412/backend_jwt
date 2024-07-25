import userService from '../service/userService'


const handleCreateUser = async (req, res) => {
    try {
        // Uncomment and use the values from req.body as needed
        let username = req.body.userName;
        let password = req.body.password;
        let email = req.body.emailName;

        userService.createNewUser(email, password, username)
        return res.send("handle create user");

    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send("Error executing query");
    }
}

const handleUserPage = async (req, res) => {

    // Model  => get data from Database

    const dataUserList = await userService.getUserList();
    console.log(dataUserList);
    return res.render("user.ejs", { dataUserList })
}


module.exports = {
    handleCreateUser,
    handleUserPage
}