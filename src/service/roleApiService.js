import { raw } from "body-parser";
import db from "../models/index"

const handleCreateNewRole = async (roles) => {
    try {
        console.log('role', roles);



        let curRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !curRoles.some(({ url: url2 }) => url1 === url2));
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: '1',
                DT: '',
            }
        }
        else {
            await db.Role.bulkCreate(persists,
                {
                    fields: ["url", "description"],
                    updateOnDuplicate: ["url"]
                }
            );
            return {
                EM: 'Create roles success ',
                EC: '0',
                DT: {
                    total: persists.length,
                    roles: persists
                },
            }
        }
        console.log(curRoles);

    } catch (error) {
        console.log('Error creating user:', error);
        return {
            EM: 'something wrong in server',
            EC: '2',
            DT: '',
        }
    }
}


const handleGetRoleList = async () => {

    try {
        let listRole = []

        listRole = await db.Role.findAll({
            attributes: ["id", "url", "description"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            raw: true,
            nest: true
        })
        console.log("check get user list", listRole);

        if (listRole) {
            console.log("chekc role email", listRole);
            return {
                EM: 'get user Successfully',
                EC: '0',
                DT: listRole
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


const handleGetRolePagination = async (page, limit) => {
    try {

        // console.log('hit here', page, limit);

        const offset = (page - 1) * limit;
        // console.log('offset and', offset, limit);


        const { count, rows } = await db.Role.findAndCountAll({
            attributes: ["id", "url", "description"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            limit: limit,
            offset: offset,
            raw: true,
            nest: true,
            distinct: true,

        });



        // console.log("check count", count);
        // console.log("check rows", rows);
        let totalPage = Math.ceil(count / limit);
        // console.log(totalPage);
        const rolesMap = new Map();

        rows.forEach(row => {
            // Kiểm tra nếu role đã tồn tại trong map
            if (!rolesMap.has(row.id)) {
                rolesMap.set(row.id, {
                    id: row.id,
                    url: row.url,
                    description: row.description,
                    groups: []
                });
            }
            // Thêm group vào role nếu chưa có
            if (row.Groups && !rolesMap.get(row.id).groups.find(group => group.id === row.Groups.id)) {
                rolesMap.get(row.id).groups.push({
                    id: row.Groups.id,
                    name: row.Groups.name,
                    description: row.Groups.description
                });
            }
        });

        const uniqueRoles = Array.from(rolesMap.values());


        // console.log("uniqueRoles", uniqueRoles);

        let data = {
            totalRows: count,
            totalPage: totalPage,
            role: uniqueRoles
        }
        if (rows.length > 0) {
            return {
                EM: 'Get role successfully',
                EC: '0',
                DT: data
            };
        } else {
            return {
                EM: 'No roles found',
                EC: '1',
                DT: ''
            };
        }
    } catch (err) {
        console.log(err);

        return {
            EM: 'Something wrong in server',
            EC: '2',
            DT: '',
        };
    }
};

// const handleDeleteRole = async (roleId) => {
//     console.log(roleId);
//     try {
//         const data = await db.Role.destroy({
//             where: { id: roleId }
//         });

//         console.log("check delete data", data);
//         if (data === 1) {
//             return {
//                 EM: "delete role successfully",
//                 EC: '0',
//                 DT: '',
//             }
//         }
//         else {
//             return {
//                 EM: "role not found",
//                 EC: '1',
//                 DT: '',
//             }
//         }
//     } catch (err) {
//         console.error('Error deleting user:', err);
//         return {
//             EM: "Something wrong in server",
//             EC: '1',
//             DT: '',
//         }
//     }
// }
const handleDeleteRole = async (roleIdArray) => {
    console.log('check dete roleIdArray', roleIdArray);
    try {
        const data = await db.Role.destroy({
            where: { id: roleIdArray }
        });
        console.log(data);

        console.log("check delete data", data);
        if (data === 0) {
            return {
                EM: "role not found",
                EC: '1',
                DT: '',
            }
        }
        else {
            return {
                EM: "delete role successfully",
                EC: '0',
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



module.exports = {
    handleCreateNewRole,
    handleGetRoleList,
    handleGetRolePagination,
    handleDeleteRole
}
