const Discord = require("discord.js");
const fs = require('fs');
const {
    inspect
} = require('util');
const request = require("request");

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.run = async (client, message, args, language) => {
    message.delete({
        timeout: 10000
    });
    if (args[0]) {
        const mess = {
            color: Math.floor(Math.random() * 16777214) + 1,
            image: {
                url: args[0],
            },
        };
        message.channel.send({
            embed: mess
        });
    } else {
        message.reply(language.imageRequired);
    }
}

module.exports.config = {
    name: "img",
    description: "Make the BOT send an image",
    usage: require("../config.json").prefix + "img (link)",
    accessableby: "Members",
    aliases: [],
    category: "😊 Just for fun",
    dmAvailable: true
}