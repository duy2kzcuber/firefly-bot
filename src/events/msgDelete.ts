import { EmbedBuilder, Events, Message, TextChannel } from 'discord.js';
import * as avatarHelper from "../helper/avatar.helper";
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID ?? '';

module.exports = {
  name: Events.MessageDelete,
  async execute(message: Message) {
    if (message.partial) {
      try {
        await message.fetch();
      } catch (error) {
        console.error('❌ Không thể fetch message bị xóa:', error);
        return;
      }
    }

    if (!message.guild || !message.content) return;
    const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID) as TextChannel;
    if (!logChannel) return;
    if (!logChannel) return;
    const channelLink = `(https://discord.com/channels/${message.guildId}/${message.channelId}/`;
    const msgAuthor = message.author;
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Tin nhắn đã xóa tại ${channelLink}`)
      .setAuthor({name: ` ${msgAuthor.displayName}`, iconURL: avatarHelper.get(msgAuthor)})
      .addFields(
        {
          name: "Nội dung tin nhắn đã xóa:",
          value: `${message.content || '(Không rõ)'}`
        }
      )
      .setTimestamp();
    await logChannel.send({ embeds: [embed] });
  },
};
