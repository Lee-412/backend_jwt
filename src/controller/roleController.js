import userApiService from '../service/userApiService'
import roleApiService from '../service/roleApiService'



const getRoleListController = async (req, res) => {
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
            const data = await roleApiService.handleGetRolePagination(page, limit);
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
            const data = await roleApiService.handleGetRoleList();
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

const getRoleController = async (req, res) => {
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

const createRoleController = async (req, res) => {

    try {

        // console.log(req.body);

        const data = await roleApiService.handleCreateNewRole(req.body)

        console.log(data);

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

// const deleteRoleController = async (req, res) => {
//     try {

//         console.log("check method delete: ", req.method);


//         const data = await roleApiService.handleDeleteRole(req.body.id)

//         if (data.EC === '2') {
//             return res.status(500).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             })
//         }
//         if (data.EC === '1') {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             })
//         }
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'Something wrong in server',
//             EC: '-2',
//             DT: '',
//         })
//     }
// }
const deleteRoleController = async (req, res) => {
    try {

        console.log("check data delete: ", req.body);


        const data = await roleApiService.handleDeleteRole(req.body.data)

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
const editRoleController = async (req, res) => {
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


module.exports = {
    getRoleListController,
    getRoleController,
    createRoleController,
    deleteRoleController,
    editRoleController,

}