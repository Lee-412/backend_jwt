import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */


const innitWebRoutes = (app) => {

    // path, handle function
    router.get("/", homeController.handleHomePage);

    router.get("/user", userController.handleUserPage);

    router.post("/users/create-user", userController.handleCreateUser);

    router.post("/delete-user/:id", userController.handleDeleteUser);
    router.get("/update-user/:id", userController.handleGetUpdateUser);

    router.post("/users/update-user", userController.handleUpdateUser);

    return app.use("/", router);
}

export default innitWebRoutes;