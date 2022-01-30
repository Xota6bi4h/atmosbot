const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const moment = require("moment")

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (arr.array().length > maxLen) {
    const len = arr.array().length - maxLen;
    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}


module.exports = {
  name: "бот",
  aliases: ["ui"],
  categories: "other",
  permissions: " ",
  description: "Show All Info Of User",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    user = message.author;

    if(!user || user == null || user.id == null || !user.id) return message.reply({content : "<:no:867068050499305482> Could not find the USER"})

    const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Профиль пользователя: " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/UA6sSqKXpZ")
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Никнейм:**',`<@${member.user.id}>`,true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Пользовательский айди:**',`\`${member.id}\``,true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Аватар:**',`[\`Открыть\`](${member.user.displayAvatarURL({ format: "webp" })})`,true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Дата создания:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Дата вступления:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Значки:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Отсутствуют'}\``,true)
        embeduserinfo.addField('**<a:936928376571179138:936928376571179138> Высшая роль:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
        embeduserinfo.addField(`<a:936928376571179138:936928376571179138> Ролей [${roles.cache.size}]: `, roles.cache.size < 25 ? roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
        embeduserinfo.setColor(ee.color)
        embeduserinfo.setFooter(ee.footertext, ee.footericon)

        message.channel.send({embeds : [embeduserinfo]})
  },
};
