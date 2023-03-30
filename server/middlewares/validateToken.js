const axios = require("axios");

function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Token is missing" });
    }

    axios
        .get("https://discord.com/api/v10/users/@me", {
            headers: { Authorization: `Bot ${token}` },
        })
        .then((res) => {
            if (res.statusCode == 401) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid token" });
            }

            next();
        })
        .catch((error) => {
            return res
                .status(401)
                .json({ success: false, message: "Invalid token" });
        });
}

module.exports = { validateToken };
