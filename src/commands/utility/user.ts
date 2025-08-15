import { ChatInputCommandInteraction,EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import * as avatarHelper from "../../helper/avatar.helper";
import { client } from '../..';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option => 
			option.setName('user')
				.setDescription('Chọn người dùng mà bạn muốn xem thông tin')
		),
	async execute(interaction: ChatInputCommandInteraction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		// console.log(client.botInfo);
		let user: any = interaction.options.getUser("user") || interaction.user;
		user.joinedTimestamp = (await interaction.guild?.members.fetch(user.id))?.joinedTimestamp ;
		user.createdAtTimeStamp = (await client.users.fetch(user.id)).createdTimestamp;

		const userCreatedAt = Math.floor((user.createdAtTimeStamp / 1000));
		const userJoinedAt =  Math.floor(user.joinedTimestamp / 1000);

		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Thông tin user')
			.setAuthor({ name: `${user.globalName}`})
			.setDescription(`${user}`)
			.addFields(
				{ 
					name: 'Tham gia discord vào: ', 
					value: `<t:${userCreatedAt}:F>`, 
					inline: true 
				},
				{ name: 'Tham gia server vào', value: `<t:${userJoinedAt}:F>`, inline: true },
			)
			.setImage(`${avatarHelper.get(user)}`)
			.setTimestamp()
			.setFooter({ text: 'Firefly', iconURL: `${avatarHelper.get(interaction.client.botInfo)}` });
		await interaction.reply({embeds: [exampleEmbed]});

	},
};