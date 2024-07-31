import express from "express";
import innitWebRoutes from "./routes/web";
import innitApiRoutes from "./routes/api";
import configViewEngine from "./config/viewEngine";
import bodyParser from 'body-parser';
import configCors from './config/cors'
// import connection from "./config/connectDB"

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

// config cors
configCors(app);

//config body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// test connection db
// connection();

//init web routers
innitWebRoutes(app);
innitApiRoutes(app);


app.listen(PORT, () => {
    console.log("Check app runing is port =" + PORT);
})