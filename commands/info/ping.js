
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'задержка',
    aliases: ['pi'], 
    categories : 'info', 
    permissions : ' ', 
    description: 'Show Bot Ping',
    cooldown : 10000,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let ping = new MessageEmbed()
            .setDescription(`**🚀 Задержка:** ${client.ws.ping}mc`)

            message.channel.send({embeds : [ping]})
        } catch (e) {
                console.log(e);
        }
    }
}