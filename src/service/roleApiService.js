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
module.exports = {
    handleCreateNewRole
}
