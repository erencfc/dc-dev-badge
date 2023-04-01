const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = async (guild) => {
    const embed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setDescription(
            "**Hello! This bot is created to help you get the developer badge. To get the badge, please execute the `/badge` command in any channel. Thanks for using this bot!**"
        );

    guild.channels.cache
        .filter((c) => c.type == ChannelType.GuildText)
        .first()
        .send({ embeds: [embed] });
};
