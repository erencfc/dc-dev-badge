const { isRunning } = require("../bot");

function checkRunning(req, res, next) {
    const token = req.headers.authorization;

    if (isRunning(token)) {
        return res
            .status(400)
            .json({ success: false, message: "Bot is already logged in" });
    }

    next();
}

module.exports = { checkRunning };
