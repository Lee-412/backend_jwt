import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
import { checkUserJWT, checkUserPermission } from "../middleware/jwtAction"

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */


const innitApiRoutes = (app) => {

    // path, handle function
    router.all('*', checkUserJWT, checkUserPermission,);

    router.get("/test-api", apiController.testApi);

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin)

    router.get("/account", userController.getUserAccount)
    router.get("/users/get-user", userController.getUserListController);
    router.get("/users/get-user/:id", userController.getUserController);
    router.post("/users/create-user", userController.createUserController);
    router.post("/users/delete-user", userController.deleteUserController);
    router.post("/users/edit-user", userController.editUserController);


    return app.use("/api/v1/", router);
}

export default innitApiRoutes;