const express = require("express");
const app = express();

require("dotenv").config();

const login = require("./routes/login");
const logout = require("./routes/logout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", login, logout);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
