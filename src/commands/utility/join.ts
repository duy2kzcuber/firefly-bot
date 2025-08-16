import { ChatInputCommandInteraction ,SlashCommandBuilder } from "discord.js";
import * as voiceHelper from "../../helper/voice.helper";


module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Tham gia vào kênh thoại'),
  async execute(interaction: ChatInputCommandInteraction){
    voiceHelper.join(interaction);
  }
}