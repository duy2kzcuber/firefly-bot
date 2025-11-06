import { EmbedAuthorOptions, EmbedBuilder, Events, Message, TextChannel } from 'discord.js';
import * as avatarHelper from "../helper/avatar.helper";
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID ?? '';

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage: Message | null, newMessage: Message) {
    if (!newMessage.guild) return;
    if (newMessage.author?.bot) return;
    if (oldMessage?.partial) await oldMessage.fetch().catch(() => { });
    if (newMessage.partial) await newMessage.fetch().catch(() => { });

    const logChannel = newMessage.guild.channels.cache.get(LOG_CHANNEL_ID) as TextChannel;
    const msgAuthor = newMessage.author;
    console.log(newMessage);
    const msgLink = `(https://discord.com/channels/${newMessage.guildId}/${newMessage.channelId}/${newMessage.id})`;
    if (!logChannel) return;
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Tin nhắn đã cập nhật tại ${msgLink}`)
      .setAuthor({name: ` ${msgAuthor.displayName}`, iconURL: avatarHelper.get(msgAuthor)})
      .addFields(
        {
          name: "Tin nhắn trước khi sửa",
          value: `${oldMessage?.content || '(Không rõ)'}`
        },
        {
          name: "Tin nhắn sau khi sửa",
          value: `${newMessage.content || '(Không rõ)'}`
        }
      )
      .setTimestamp();
    await logChannel.send({ embeds: [embed] });
  },
};
