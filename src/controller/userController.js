import userApiService from '../service/userApiService'

const getUserListController = async (req, res) => {
    try {

        // console.log("check query", req.query);
        // console.log("check log req user", req.user);

        if (req.query.page && req.query.limit) {
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);

            if (isNaN(page) || isNaN(limit)) {
                return res.status(200).json({
                    EM: 'page and limit are invalid',
                    EC: '1',
                    DT: '',
                })
            }
            // console.log(page, limit);
            const data = await userApiService.handleGetUserPagination(page, limit);
            // console.log("check log data", data);

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

        }
        else {
            const data = await userApiService.handleGetUserList();
            // console.log("check log data", data);

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

        }

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
        // console.log("check Id", id);

        const data = await userApiService.getUserById(id);
        // console.log("check log data get user by ID", data);

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

        console.log("check method delete: ", req.method);


        const data = await userApiService.handleDeleteUser(req.body.id)

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
        const data = await userApiService.updateUserInfor(req.body);

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

const getUserAccount = (req, res) => {
    return res.status(200).json({
        EM: 'oke',
        EC: 0,
        DT: {
            access_token: req.token,
            email: req.user.email,
            username: req.user.username,
            role: req.user.rolez,

        },

    })
}
module.exports = {
    getUserListController,
    getUserController,
    createUserController,
    deleteUserController,
    editUserController,
    getUserAccount
}