import userApiService from '../service/userApiService'

const getUserListController = async (req, res) => {
    try {
        const data = await userApiService.handleGetUserList();
        console.log("check log data", data);

        if (data.EC === '2') {
            return res.status(500).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: '-2',
            DT: '',
        })
    }
}

const getUserController = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("check Id", id);

        const data = await userApiService.getUserById(id);
        console.log("check log data get user by ID", data);

        if (data.EC === '2') {
            return res.status(500).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: '-2',
            DT: '',
        })
    }
}

const createUserController = async (req, res) => {

    try {
        const data = await userApiService.handleCreateNewUser(req.body)
        if (data.EC === '2') {
            return res.status(500).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        if (data.EC === '1') {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: {
                email: data.DT.email,
                phone: data.DT.phone,
                sex: data.DT.sex,
                address: data.DT.address,
                username: data.DT.username,
                id: data.DT.id
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: '-2',
            DT: '',
        })
    }
}

const deleteUserController = async (req, res) => {
    try {

        const data = await userApiService.handleDeleteUser(req.body.id)

        console.log("check data delete from server", data);

        if (data.EC === '2') {
            return res.status(500).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        if (data.EC === '1') {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: '-2',
            DT: '',
        })
    }
}

const editUserController = async (req, res) => {
    try {
        console.log("check req edit user", req.body);
        const data = await userApiService.updateUserInfor(req.body);
        console.log("check log edit user", data);

        if (data.EC === '2') {
            return res.status(500).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        if (data.EC === '1') {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log("something wrong in server", error);
        return res.status(500).json({
            EM: 'something wrong in server',
            EC: '2',
            DT: ''
        })

    }
}

module.exports = {
    getUserListController,
    getUserController,
    createUserController,
    deleteUserController,
    editUserController
}