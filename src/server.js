require("dotenv").config();

import express from "express";
import innitWebRoutes from "./routes/web";
import innitApiRoutes from "./routes/api";
import configViewEngine from "./config/viewEngine";
import bodyParser from 'body-parser';
import configCors from './config/cors'
import { createJWT } from './middleware/jwtAction'
import { verifyJWT } from './middleware/jwtAction'
import cookieParser from 'cookie-parser';

// import connection from "./config/connectDB"


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

// config cookie-parser
app.use(cookieParser())

//init web routers
innitWebRoutes(app);
innitApiRoutes(app);




// middleware:  req => middleware => res
app.use((req, res) => {
    return res.send("404 not found");
})
app.listen(PORT, () => {
    console.log("Check app runing is port =" + PORT);
})