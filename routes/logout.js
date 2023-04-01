const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { removeBot, isRunning } = require("../bot");

router.post("/logout", validateToken, async (req, res) => {
    const token = req.headers.authorization;

    if (!isRunning(token)) {
        return res
            .status(400)
            .json({ success: false, message: "Bot is already logged out" });
    }

    try {
        removeBot(token);

        res.status(200).json({
            success: true,
            message: "Bot logout successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Bot logout failed" });
    }
});

module.exports = router;
