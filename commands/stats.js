const Discord = require("discord.js");
const fs = require('fs');
const {
    inspect
} = require('util');
const request = require("request");

module.exports.run = async (client, message, args) => {
    message.delete({
        timeout: 10000
    });
    message.channel.send("", {
        embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            description: "Connecting to the BOT server, please wait..."
        }
    }).then(msg => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        var svStatus = "Unknown";
        var quoteInfo = "";
        const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
        const memoryData = process.memoryUsage();
        const memoryUsage = {
            rss: `${formatMemoryUsage(memoryData.rss)}`,
            heapTotal: `${formatMemoryUsage(memoryData.heapTotal)}`,
            heapUsed: `${formatMemoryUsage(memoryData.heapUsed)}`,
            external: `${formatMemoryUsage(memoryData.external)}`,
        };
        var os = require('os-utils');
        os.cpuUsage(cpu => {
            request(process.env.php_server_url + '/GetAllQuotes.php', function(error, response, body) {
                if (response && response.statusCode == 200) {
                    if (!body.includes("Connection failed")) {
                        svStatus = "Operational";
                    } else {
                        svStatus = "Cannot connect to the SQL server";
                    }
                } else {
                    svStatus = "Cannot connect to the PHP server!";
                }
                var dated = new Date();
                const mess = {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    title: 'BOT\'s current status',
                    description: "⏰ **BOT's restart time**: " + client.startTime.getDate() + "/" + (client.startTime.getMonth() + 1) + "/" + client.startTime.getFullYear() + "; " + client.startTime.getHours() + ":" + client.startTime.getMinutes() + "\n⬆️ **Active time:** " + days + "days, " + hours + "hours, " + minutes + "mins, " + parseInt(seconds) + "secs\n🙂 **Server response:** " + (dated.getTime() - message.createdTimestamp) + " ms\n🖥️ **Server status:** " + svStatus + "\n" + quoteInfo + "🚩 **Joined servers:** " + client.guilds.cache.size + "\n👪 **Number of users:** " + client.users.cache.size + "\n#️⃣ **Channels:** " + client.channels.cache.size + "\n💬 **Number of messages sent (from BOT's last restart):** " + client.sentMessages + "\n🤖 **Number of commands executed (from BOT's last restart):** " + client.botMessages + "\n💭 **BOT's Memory Usage:**\n- **Resident Set Size:** " + memoryUsage.rss + "\n- **Heap Total Size:** " + memoryUsage.heapTotal + "\n- **Heap Used Size:** " + memoryUsage.heapUsed + "\n- **V8 External Memory:** " + memoryUsage.external + "\n🤖 **CPU Usage:** " + cpu.toFixed(2) + "%",
                    footer: {
                        text: client.devUsername
                    },
                };
                msg.edit({
                    embed: mess
                });
            });
        });
    });
}

module.exports.config = {
    name: "stats",
    description: "Get the BOT's statistics",
    usage: require("../config.json").prefix + "stats",
    accessableby: "Members",
    aliases: [],
    category: "🤖 BOT information",
    dmAvailable: true
}