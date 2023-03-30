const { EmbedBuilder } = require("discord.js");
const { removeBot } = require("../activeBots");

module.exports = async (interaction) => {
    const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(
            `Hey ${interaction.user}, you have been executed the command successfully! You can get your 'Active Developer Badge' in the [Discord Developer Portal](https://discord.com/developers/active-developer). Thanks for using this bot!\n\n__**If on the portal, you don't see the badge, please try again in 24 hours.**__`
        );
    await interaction.reply({ embeds: [embed] });

    removeBot(interaction.client.token);
};
