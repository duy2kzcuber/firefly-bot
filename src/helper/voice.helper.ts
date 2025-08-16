import { entersState, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { ChatInputCommandInteraction, GuildMember } from "discord.js";
import * as PermissionHelper from "../helper/permission.helper";
import {Server, servers} from "../models/server"
export const join = async (interaction: ChatInputCommandInteraction): Promise<void>=> {
  try{
    let server = servers.get(interaction.guildId as string);
    console.log((interaction.member as GuildMember).voice.channel);
    if (!server) {
      if (
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        server = new Server(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          }),
          interaction.guildId as string,
        );
        await interaction.reply("đã vào voice");
        servers.set(interaction.guildId as string, server);
        console.log(servers);
        return;
      }
    }
    if (!server) {
      await interaction.reply("123");
      return;
    }

    // Make sure the connection is ready before processing the user's request
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3,
      );
    } catch (error) {
      return;
    }

  }
  catch(error){
    console.log(error);
    interaction.reply("Đã xảy ra lỗi trong khi vào voice chat!");
    return ;
  }
}