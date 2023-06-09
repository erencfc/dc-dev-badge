const activeBots = {};

const addBot = (token, client, timeout) => {
    const to = setTimeout(() => {
        client.destroy();
        delete activeBots[token];
        console.log("Bot logout successful");
    }, timeout);

    activeBots[token] = { client, timeout: to };
};

const removeBot = (token) => {
    if (activeBots[token]?.timeout) {
        clearTimeout(activeBots[token].timeout);
    }
    if (activeBots[token]?.client) {
        activeBots[token].client.destroy();
    }
    delete activeBots[token];
    console.log("Bot logout successful");
};

const isRunning = (token) => {
    return activeBots[token] ? true : false;
};

module.exports = { addBot, removeBot, isRunning };
