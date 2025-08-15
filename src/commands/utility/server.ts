import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import * as avatarHelper from "../../helper/avatar.helper";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Đưa ra thông tin về server'),
  async execute(interaction: ChatInputCommandInteraction){
    // console.log(interaction.guild);
    const emoji = await interaction.guild?.emojis.fetch();
    const channel = await interaction.guild?.channels.fetch();

    const guildInfo: any = {
      id: interaction.guildId,
      serverName: interaction.guild?.name,
      memberCount: interaction.guild?.memberCount,
      ownerId: interaction.guild?.ownerId,
      icon: `https://cdn.discordapp.com/icons/${interaction.guildId}/${interaction.guild?.icon}`,
      serverCreatedAtTimeStamp: 0,
      numberOfEmoji: emoji?.size,
      channel: {
        text: channel?.filter(item => item?.type == 0).size,
        voice: channel?.filter(item => item?.type == 2).size,
      }
    }
    if(interaction.guild?.createdTimestamp){
      guildInfo.createdAtTimeStamp = Math.floor(interaction.guild?.createdTimestamp / 1000);
    }
    console.log(guildInfo);
    const embedRespone = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Thông tin server')
      .setThumbnail(guildInfo.icon || null)
      .setAuthor({name: `${guildInfo.serverName}`})
      .addFields(
        {
          name: 'Server ID: ',
          value: `${guildInfo.id}`,
          inline: true
        },
        {
          name: 'Ngày tạo server: ',
          value: `<t:${guildInfo.createdAtTimeStamp}:F>`,
          inline: true
        },
        {
          name: 'Chủ server:',
          value: `<@${guildInfo.ownerId}>`,
          inline: true
        },
      )
      .addFields(
        {
          name: `Số lượng kênh(${guildInfo.channel.text + guildInfo.channel.voice}):`,
          value: `Text: ${guildInfo.channel.text} \n Thoại: ${guildInfo.channel.voice}`,
          inline: true
        },
        {
          name: `Số lượng thành viên: `,
          value: `${guildInfo.memberCount}`,
          inline: true
        }
      )
      .setTimestamp()
      .setFooter({ text: 'Firefly', iconURL: `${avatarHelper.get(interaction.client.botInfo)}` });
    await interaction.reply({embeds: [embedRespone]})
  }
}