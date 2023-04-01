const express = require("express");
const app = express();

require("dotenv").config();

const login = require("./routes/login");
const logout = require("./routes/logout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use("/api", login, logout);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
