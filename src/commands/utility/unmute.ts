import { ChatInputCommandInteraction,EmbedBuilder, MessageFlags, SlashCommandBuilder, InteractionReplyOptions } from 'discord.js';
import { client } from '../..';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Bỏ mute 1 người dùng')
    .addUserOption(option => 
      option.setName('target-user')
        .setDescription('Chọn người bạn muốn mute')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    // console.log(client.botInfo);
    // const guild = interaction.guild;
    // const targetUser = await guild?.members.fetch(`${interaction.options.get('target-user')?.user?.id}`) ;
    // if(!targetUser || targetUser.user.bot){
    //  await interaction.reply(`Bạn phải chọn người mute!`);
    //  return;
    // }
    // const user = interaction.user;
    // const permissions = interaction.memberPermissions;
    // const isUserHavePermission = permissions?.has('ModerateMembers');
    // if(!isUserHavePermission){
    //   await interaction.reply({ content: `Bạn không có quyền mute!`, flags: MessageFlags.Ephemeral});
    //   return;
    // }

    // if(targetUser.permissions.has('ModerateMembers')){
    //   await interaction.reply({ content: `Người dùng <@!${targetUser.id}> không thể bị mute!`, flags: MessageFlags.Ephemeral});
    //   return;
    // }
    // try{
    //   const role = await interaction.guild?.roles.fetch('426390481941823489');
    //   if(role)
    //     await targetUser.roles.add(role);
    //   console.log(role);
    // }
    // catch(error){
    //   console.log(error);
    //   await interaction.reply({ content: `Đã có lỗi khi thực hiện lệnh`, flags: MessageFlags.Ephemeral});
    //   return;
    // }
    // await interaction.reply(`Đã mute <@!${targetUser.id}> trong ?? phút`);
      return interaction.reply({
        content: `Đang phát triển`,
        flags: MessageFlags.Ephemeral
      })
  },
};