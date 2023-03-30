const express = require("express");
const app = express();

const login = require("./routes/login");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", login);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
