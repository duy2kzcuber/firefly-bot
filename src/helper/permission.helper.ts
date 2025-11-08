import { GuildMember, PermissionsBitField, VoiceBasedChannel } from 'discord.js';
import { client } from '../index';
export const checkCanJoinVoice = (channel: VoiceBasedChannel, member: GuildMember) => {
  const botInfo = client.botInfo as GuildMember;
  return channel.permissionsFor(botInfo).has(PermissionsBitField.Flags.Connect);
}
