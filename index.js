const express = require("express");
const connectDB = require("./config/db");
require('dotenv').config({ path: './config/.env' });
const app = express();

//connect to the database
connectDB();

//it allows us to accept json data into our api
app.use(express.json({ extended: false }));

//define routes

app.use("/api/url", require("./routes/index"));
app.use("/", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
