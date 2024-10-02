const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParsor = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


const errorMiddleware = require("./middleware/error");

// Confige
dotenv.config({path: "backend/config/config.env"});


const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};



// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParsor.urlencoded({extended: true}));
app.use(fileUpload());



// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");







app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;