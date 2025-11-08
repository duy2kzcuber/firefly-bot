import { ClientUser, Events} from 'discord.js';
import violationModel from '../models/ViolationModel'
import * as database from "../config/database";
import { VIOLATION_ENUM } from '../constant/ViolationTypeEnum';
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: any)  {
		client.botInfo = client.user; 
		console.log(`Sẵn sàng! Đã đăng nhập với ${client.user.tag}`);
		const guild = await client.guilds.fetch(`${process.env.guildId}`);
		const roleId = process.env.MUTE_ROLE_ID;
		//Quét người dùng bị tempmute để unmute họ
		setInterval(async () => {
    try {
      console.log('⏳ Đang quét cơ sở dữ liệu...');
			const now = Date.now();
			const violateUserList = await violationModel.find({
				expiresAt: {
					$lte: now
				},
				type: VIOLATION_ENUM.MUTE
			})
			const listUnmuteUserIds= [];
			for(const user of violateUserList){
				listUnmuteUserIds.push(`${user.userId}`)
			}
			//get user
			const members = await Promise.all(
				listUnmuteUserIds.map(async userId => {
					try {
						return await guild.members.fetch(userId); // chỉ fetch user này
					} catch (err) {
					}
				})
			);
			//Gỡ role mute các thành viên
			for(const member of members){
				const memberRoles = member.roles;
				console.log(memberRoles);
				if(member && memberRoles){
					await member.roles.remove(roleId);
					console.log(`✅ Đã gỡ role khỏi ${member.user.tag}`);
				}
			}
			//Xóa role
			violationModel.deleteMany({
				userId: {$in: listUnmuteUserIds}
			});
      console.log('✅ Quét DB xong');
    } catch (error) {
      console.error('❌ Lỗi khi quét DB:', error);
    }
  }, 60 * 1000);
	},
};
