import { Events } from 'discord.js';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: { user: { tag: any; }; }) {
		console.log(`Sẵn sàng! Đã đăng nhập với ${client.user.tag}`);
	},
};
