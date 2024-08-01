import e from "express";
import loginRegisterService from "../service/loginRegisterService";


const testApi = (req, res) => {

    return res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    console.log("check req", req.body);
    try {
        //req.body: email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.username) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "-1",
                DT: 'Data is invalid'
            })
        }
        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: "Your password must have more than 5 letters",
                EC: "-1",
                DT: 'Data is invalid'
            })
        }

        //service: create user
        let data = await loginRegisterService.registerNewUser(req.body)

        if (data.EC === '0') {
            return res.status(200).json({
                EM: `A user create successfully`,
                EC: "0",
                DT: ''
            })
        }
        else {
            if (data.EC === '-2') {
                return res.status(500).json({
                    EM: `${data.EM}`,
                    EC: `${data.EC}`,
                    DT: `${data.DT}`
                })
            }
            else {
                return res.status(200).json({
                    EM: `${data.EM}`,
                    EC: `${data.EC}`,
                    DT: `${data.DT}`
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            EM: "error",
            EC: "-1",
            DT: 'Data is invalid'
        })
    }
}
module.exports = {
    testApi,
    handleRegister,
}