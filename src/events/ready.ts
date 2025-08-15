import { ClientUser, Events} from 'discord.js';
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: any) {
		client.botInfo = client.user;
		console.log(`Sẵn sàng! Đã đăng nhập với ${client.user.tag}`);
	},
};
