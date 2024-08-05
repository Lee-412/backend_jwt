import express from "express";
import homeController from "../controller/homeController";
import userServerController from "../controller/userServerController";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */


const innitWebRoutes = (app) => {

    // path, handle function
    router.get("/", homeController.handleHomePage);

    router.get("/user", userServerController.handleUserPage);

    router.post("/users/create-user", userServerController.handleCreateUser);

    router.post("/delete-user/:id", userServerController.handleDeleteUser);
    router.get("/update-user/:id", userServerController.handleGetUpdateUser);

    router.post("/users/update-user", userServerController.handleUpdateUser);

    return app.use("/", router);
}

export default innitWebRoutes;