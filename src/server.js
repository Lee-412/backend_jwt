import express from "express";
import innitWebRoutes from "./routes/web";
import configViewEngine from "./configs/viewengine";
require("dotenv").config();

const app = express();

// config view engine
configViewEngine(app);

//init web routers
innitWebRoutes(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Check app runing is port =" + PORT);
})