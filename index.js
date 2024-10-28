const express = require('express');
const cors = require("cors");
require('dotenv').config()
const routes = require("./routes");

// Get env config/defaults
const {ROOT_PATH, SERVER_PORT} = process.env;

const port = SERVER_PORT || 8080;
const rootPath = ROOT_PATH || "/";

// Init server
const app = express();

// Use JSON 
app.use(express.json());

// Setup CORS
app.use(cors({ origin: true, credentials: true }));
app.use(rootPath, (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// Setup routes
app.use(rootPath, routes);

// Start listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`API root path: ${rootPath}`);
});