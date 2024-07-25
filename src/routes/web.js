import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";


const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */


const innitWebRoutes = (app) => {

    // path, handle function
    router.get("/", homeController.handleHomePage);

    router.get("/user", userController.handleUserPage);

    router.post("/users/create-user", userController.handleCreateUser)
    return app.use("/", router);
}

export default innitWebRoutes;