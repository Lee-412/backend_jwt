import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
import roleController from "../controller/roleController";

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

    //user routes
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get("/account", userController.getUserAccount)
    router.get("/users/get-user", userController.getUserListController);
    router.get("/users/get-user/:id", userController.getUserController);
    router.post("/users/create-user", userController.createUserController);
    router.post("/users/delete-user", userController.deleteUserController);
    router.post("/users/edit-user", userController.editUserController);

    //role routes

    router.get("/roles/get-role", roleController.getRoleListController);
    router.get("/roles/get-role/:id", roleController.getRoleController);
    router.post("/roles/create-role", roleController.createRoleController);
    router.post("/roles/delete-role", roleController.deleteRoleController);
    router.post("/roles/edit-role", roleController.editRoleController);

    return app.use("/api/v1/", router);
}

export default innitApiRoutes;