import db from "../models/index"

const getGroupWithRole = async (user) => {
    //scope

    let userRoleWithGroup = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        },

    })

    // console.log("check role user group", userRoleWithGroup);

    return userRoleWithGroup ? userRoleWithGroup : {};
}

module.exports = {
    getGroupWithRole
}