import { Events, GuildMember, TextChannel } from 'discord.js';

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID ?? '';
/*
Todo: tìm cách fix phần này
*/
module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member: GuildMember) {
    console.log("handle member remove");
    const logChannel = member.guild.channels.cache.get(LOG_CHANNEL_ID) as TextChannel;
    if (!logChannel) return;

    await logChannel.send(`🚪 Thành viên rời đi: **${member.user.tag}**`);
  },
};
