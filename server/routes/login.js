const express = require("express");
const router = express.Router();

const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const guildCreate = require("../events/guildCreate");
const interactionCreate = require("../events/interactionCreate");

const { validateToken } = require("../middlewares/validateToken");
const { checkRunning } = require("../middlewares/checkRunning");

const { addBot } = require("../bot");

router.post("/login", checkRunning, validateToken, async (req, res) => {
    const token = req.headers.authorization;

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    try {
        client.on("guildCreate", (guild) => {
            guildCreate(guild);
        });
        client.on("ready", async () => {
            console.log("Bot login successful");
            if (client.guilds.cache.size > 0)
                client.emit("guildCreate", client.guilds.cache.first());
            client.user.setActivity({
                name: "kleesd was here ^^",
                type: ActivityType.Watching,
            });

            await client.application.commands.create({
                name: "badge",
                description: "Get the developer badge!",
            });

            addBot(token, client, 300000);
        });

        client.on("interactionCreate", (interaction) => {
            interactionCreate(interaction);
        });

        await client.login(token);

        res.status(200).json({
            success: true,
            message: "Bot login successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Bot login failed" });
    }
});

module.exports = router;
