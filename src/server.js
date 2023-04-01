const express = require("express");
const app = express();

require("dotenv").config();

const login = require("./routes/login");
const logout = require("./routes/logout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api", login, logout);

const PORT = 10000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
