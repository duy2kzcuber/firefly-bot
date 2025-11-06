import { EmbedBuilder, Events, GuildMember, TextChannel } from 'discord.js';

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID ?? '';

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember) {
    console.log("handle member add");
    const logChannel = member.guild.channels.cache.get(LOG_CHANNEL_ID) as TextChannel;
    if (!logChannel) return;
    
    await logChannel.send(`👋 Thành viên mới: **${member.user.tag}** (${member.id})`);
  },
};
