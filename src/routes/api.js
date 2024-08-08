import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */

const testMiddleWare = (req, res, next) => {
    console.log("calling a middleWare");
    // if (true) {
    //     return res.send("404 not found");
    // }
    next();
}

const innitApiRoutes = (app) => {



    // path, handle function

    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", testMiddleWare, apiController.handleLogin)

    router.get("/users/get-user", userController.getUserListController);
    router.get("/users/get-user/:id", userController.getUserController);

    router.post("/users/create-user", userController.createUserController);
    router.post("/users/delete-user", userController.deleteUserController);
    router.post("/users/edit-user", userController.editUserController);


    return app.use("/api/v1/", router);
}

export default innitApiRoutes;