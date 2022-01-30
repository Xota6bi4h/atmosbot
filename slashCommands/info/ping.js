const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [''], 
    categories : ' ', 
    description: 'Задержка бота (by Иосиф Сид#6657)',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        interaction.editReply({content : `**🚀 Задержка:** ${client.ws.ping}mc`})
    }
}