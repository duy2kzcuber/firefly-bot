import { ChatInputCommandInteraction,EmbedBuilder, MessageFlags, SlashCommandBuilder, InteractionReplyOptions, PermissionFlagsBits } from 'discord.js';
import {VIOLATION_ENUM } from '../../constant/ViolationTypeEnum';
import ViolationModel from '../../models/ViolationModel'; 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute 1 người dùng')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption(option => 
      option.setName('target-user')
        .setDescription('Chọn người bạn muốn mute')
    )
    .addNumberOption(option => 
      option.setName('mute-time')
        .setDescription('Nhập thời gian mute (phút)')
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Lí do mute')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    // console.log(client.botInfo);
    const guild = interaction.guild;
    const targetUser = await guild?.members.fetch(`${interaction.options.get('target-user')?.user?.id}`) ;
    if(!targetUser || targetUser.user.bot){
     await interaction.reply(`Bạn phải chọn người mute!`);
     return;
    }
    const user = interaction.user;
    const permissions = interaction.memberPermissions;

    const reason = interaction.options.get('reason')?.value || "";
    const muteTime = parseInt(`${interaction.options.get('mute-time')?.value}`) || 0;

    const isUserHavePermission = permissions?.has('ModerateMembers');
    if(!isUserHavePermission){
      await interaction.reply({ content: `Bạn không có quyền mute!`, flags: MessageFlags.Ephemeral});
      return;
    }

    if(targetUser.permissions.has('ModerateMembers')){
      await interaction.reply({ content: `Người dùng <@!${targetUser.id}> không thể bị mute!`, flags: MessageFlags.Ephemeral});
      return;
    }
    try{
      const role = await interaction.guild?.roles.fetch('426390481941823489');
      if(role){
        await targetUser.roles.add(role);
        //Lưu người dùng mute vào CSDL
        const now = new Date();
        const data = {
          userId: targetUser.id,
          type: VIOLATION_ENUM.MUTE,
          reason: reason,
          expiresAt: new Date(now.getTime() + muteTime *60 * 1000),
          moderatorActioned: user.id
        }
        const violation = new ViolationModel(data);
        await violation.save();
      }
    }
    catch(error){
      console.log(error);
      await interaction.reply({ content: `Đã có lỗi khi thực hiện lệnh`, flags: MessageFlags.Ephemeral});
      return;
    }


    await interaction.reply(`Đã mute <@!${targetUser.id}> trong ${muteTime} phút vì **${reason}**`);
  },
};