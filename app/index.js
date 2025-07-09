const {
  Client,
  Intents,
  MessageAttachment,
  MessageEmbed,
  Permissions,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
  GatewayIntentBits,
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  IntentsBitField,
  Guild,
  GuildMember,
  ApplicationCommandOptionType,
  MessageMentions,
  MessageActionRowOptions,
  MessageSelectMenuOptions,
  Presence,
  UserFlags,
  AttachmentBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  WebhookClient,
  version: discordVersion,
} = require("discord.js");
const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
require("dotenv").config();
const fs = require("fs");
const options = {
  intents: [
    "Guilds",
    "GuildBans",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildChannels,",
    "GuildPresences",
    "MessageContent",
    "GatewayIntentBits.GuildVoiceStates",
    "GatewayIntentBits.GuildMembers",
    "IntentsBitField.Flags.GuildMessages",
    "IntentsBitField.Flags.MessageContent",
    "DirectMessages",
    "DirectMessageReactions",
    "DirectMessageTyping",
    "GuildPresences",
    "Discord.Intents.FLAGS.GUILDS",
    "Discord.Intents.FLAGS.GUILD_MESSAGES",
    "Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS",
  ],
};
const client = new Client({
  partials: ["CHANNEL"],
  intents: new Intents(32767),
});
//ここから
client.once("ready", async () => {
  try {
    const command = await client.application.commands.create({
      name: "rp-create",
      description: "ロールパネルを新しく作成します",
      options: [
        {
          name: "role",
          description: "パネルに最初に追加するロールを選択してください",
          type: "ROLE",
          required: true,
        },
        {
          name: "title",
          description:
            "パネルのタイトルを指定してください(指定無しの場合のタイトル:役職パネル)",
          type: "STRING",
          required: false,
        },
        {
          name: "description",
          description:
            "パネルの説明を指定してください(指定無しの場合説明は記載されません)",
          type: "STRING",
          required: false,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

client.once("ready", async () => {
  try {
    await client.application.commands.create({
      name: "rp-add",
      description: "ロールパネルにロールを追加します",
      options: [
        {
          name: "messageid",
          description: "追加するパネルのメッセージIDを指定してください",
          type: "STRING",
          required: true,
        },
        {
          name: "role",
          description: "追加するロールを選択してください",
          type: "ROLE",
          required: true,
        },
        {
          name: "role2",
          description: "追加する2番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role3",
          description: "追加する3番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role4",
          description: "追加する4番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role5",
          description: "追加する5番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role6",
          description: "追加する6番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role7",
          description: "追加する7番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role8",
          description: "追加する8番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role9",
          description: "追加する9番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
        {
          name: "role10",
          description: "追加する10番目のロールを選択してください",
          type: "ROLE",
          required: false,
        },
      ],
    });
    console.log("Bot is ready and slash commands are registered.");
  } catch (error) {
    console.error(error);
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("r.createpanel")) {
    const roleMentions = message.mentions.roles;
    if (roleMentions.size === 0)
      return message.reply("ロールをメンションしてください！");

    const roleOrder = message.content
      .match(/<@&(\d+)>/g)
      .map((match) => match.match(/\d+/)[0]);
    const roles = roleOrder.map((roleId) => roleMentions.get(roleId).id);

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("リアクションロール")
      .setDescription(
        roles.map((roleId, index) => `${emoji[index]} <@&${roleId}>`).join("\n")
      );

    const roleMessage = await message.channel.send({ embeds: [embed] });
    for (let i = 0; i < roles.length; i++) {
      await roleMessage.react(emoji[i]);
    }

    const newPanelData = {
      messageId: roleMessage.id,
      roles: roles,
      emojis: emoji.slice(0, roles.length),
      channelId: message.channel.id,
    };

    fs.appendFileSync(rolePanelFile, JSON.stringify(newPanelData) + "\n");

    rolePanelData[roleMessage.id] = newPanelData;
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("r.rolepaneladd")) {
    const args = message.content.split(" ");
    if (args.length < 3)
      return message.reply("メッセージIDとロールを指定してください。");

    const messageId = args[1];
    const roleMentions = message.mentions.roles;
    if (roleMentions.size === 0)
      return message.reply("ロールをメンションしてください！");

    const panelData = rolePanelData[messageId];
    if (!panelData) {
      return message.reply(
        "指定されたメッセージIDのロールパネルが見つかりませんでした。"
      );
    }

    const currentEmojiCount = panelData.emojis.length;
    const emojis = [
      "🇦",
      "🇧",
      "🇨",
      "🇩",
      "🇪",
      "🇫",
      "🇬",
      "🇭",
      "🇮",
      "🇯",
      "🇰",
      "🇱",
      "🇲",
      "🇳",
      "🇴",
      "🇵",
      "🇶",
      "🇷",
      "🇸",
      "🇹",
      "🇺",
      "🇻",
      "🇼",
      "🇽",
      "🇾",
      "🇿",
    ];
    const nextEmoji = emojis[currentEmojiCount];
    if (!nextEmoji) {
      return message.reply("追加できるリアクションの上限に達しました。");
    }

    const roleId = roleMentions.first().id;

    try {
      const channel = await client.channels.fetch(panelData.channelId);
      const roleMessage = await channel.messages.fetch(messageId);

      await roleMessage.react(nextEmoji);

      panelData.roles.push(roleId);
      panelData.emojis.push(nextEmoji);

      const embed = roleMessage.embeds[0];
      const updatedEmbed = new MessageEmbed(embed).setDescription(
        panelData.roles
          .map((roleId, index) => `${panelData.emojis[index]} <@&${roleId}>`)
          .join("\n")
      );

      await roleMessage.edit({ embeds: [updatedEmbed] });

      const fileContent = fs.readFileSync(rolePanelFile, "utf8");

      const newFileContent = fileContent
        .split("\n")
        .map((line) => {
          if (line.trim() === "") return line;

          try {
            const data = JSON.parse(line);
            if (data.messageId === messageId) {
              return JSON.stringify(panelData);
            }
            return line;
          } catch (err) {
            console.error("JSONパースエラー:", err);
            return line;
          }
        })
        .join("\n");

      fs.writeFileSync(rolePanelFile, newFileContent);

      rolePanelData[messageId] = panelData;

      message.reply(
        `メッセージID ${messageId} にロールを追加しました。リアクション: ${nextEmoji}`
      );
    } catch (error) {
      console.error("リアクションとロールの追加に失敗しました:", error);
      message.reply("リアクションとロールの追加に失敗しました。");
    }
  }
});

const rolePanelFile = "./rolepanel.txt";
let rolePanelData = {};

const emoji = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
  "🇮",
  "🇯",
  "🇰",
  "🇱",
  "🇲",
  "🇳",
  "🇴",
  "🇵",
  "🇶",
  "🇷",
  "🇸",
  "🇹",
  "🇺",
  "🇻",
  "🇼",
  "🇽",
  "🇾",
  "🇿",
];

const emojis = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
  "🇮",
  "🇯",
  "🇰",
  "🇱",
  "🇲",
  "🇳",
  "🇴",
  "🇵",
  "🇶",
  "🇷",
  "🇸",
  "🇹",
  "🇺",
  "🇻",
  "🇼",
  "🇽",
  "🇾",
  "🇿",
];

client.once("ready", async () => {

  if (fs.existsSync(rolePanelFile)) {
    const rawData = fs.readFileSync(rolePanelFile, "utf8");
    const lines = rawData.split("\n").filter((line) => line.trim() !== "");

    for (const line of lines) {
      try {
        const panelData = JSON.parse(line);

        rolePanelData[panelData.messageId] = panelData;

        const channel = await client.channels.fetch(panelData.channelId);
        const roleMessage = await channel.messages.fetch(panelData.messageId);
        console.log("Message fetched and cached:", roleMessage.content);
      } catch (error) {
        console.error("Failed to parse and fetch the role message:", error);
      }
    }
  }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === "rp-create") {
      const role = interaction.options.getRole("role");
      const title = interaction.options.getString("title") || "役職パネル";
      const description = interaction.options.getString("description") || "";
  
      const roles = [role.id];
  
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(title)
        .setDescription(`${emoji[0]} <@&${roles[0]}>\n${description}`);
  
      const roleMessage = await interaction.channel.send({ embeds: [embed] });
      await roleMessage.react(emoji[0]);
  
      const newPanelData = {
        messageId: roleMessage.id,
        roles: roles,
        emojis: emoji.slice(0, roles.length),
        channelId: interaction.channel.id,
      };
  
      fs.appendFileSync(rolePanelFile, JSON.stringify(newPanelData) + "\n");
  
      rolePanelData[roleMessage.id] = newPanelData;
  
      await interaction.reply({
        content: `ロールパネルを作成しました`,
        ephemeral: true,
      });
    }
  });

  client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "rp-add") {
    await interaction.deferReply({ ephemeral: true }); // 処理の開始を通知

    const messageId = interaction.options.getString("messageid");
    const roles = [
      interaction.options.getRole("role"),
      interaction.options.getRole("role2"),
      interaction.options.getRole("role3"),
      interaction.options.getRole("role4"),
      interaction.options.getRole("role5"),
      interaction.options.getRole("role6"),
      interaction.options.getRole("role7"),
      interaction.options.getRole("role8"),
      interaction.options.getRole("role9"),
      interaction.options.getRole("role10"),
    ].filter(Boolean);

    const panelData = rolePanelData[messageId];
    if (!panelData) {
      return interaction.editReply(
        "指定されたメッセージIDのロールパネルが見つかりませんでした。"
      );
    }

    const currentEmojiCount = panelData.emojis.length;
    const nextEmojis = emojis.slice(
      currentEmojiCount,
      currentEmojiCount + roles.length
    );

    try {
      const channel = await client.channels.fetch(panelData.channelId);
      const roleMessage = await channel.messages.fetch(messageId);

      for (let i = 0; i < roles.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒の遅延を追加
        await roleMessage.react(nextEmojis[i]);
      }

      panelData.roles.push(...roles.map((role) => role.id));
      panelData.emojis.push(...nextEmojis);

      const embed = roleMessage.embeds[0];
      const updatedEmbed = new MessageEmbed(embed).setDescription(
        panelData.roles
          .map((roleId, index) => `${panelData.emojis[index]} <@&${roleId}>`)
          .join("\n")
      );
      await roleMessage.edit({ embeds: [updatedEmbed] });

      const fileContent = fs.readFileSync(rolePanelFile, "utf8");
      const newFileContent = fileContent
        .split("\n")
        .map((line) => {
          if (line.trim() === "") return line;
          try {
            const data = JSON.parse(line);
            if (data.messageId === messageId) {
              return JSON.stringify(panelData);
            }
            return line;
          } catch (err) {
            console.error("JSONパースエラー:", err);
            return line;
          }
        })
        .join("\n");
      fs.writeFileSync(rolePanelFile, newFileContent);

      rolePanelData[messageId] = panelData;

      await interaction.editReply({
        content: `ロールパネルID:${messageId}にロールを追加しました`,
      });
    } catch (error) {
      console.error("リアクションとロールの追加に失敗しました:", error);
      await interaction.editReply({
        content: `リアクションとロールの追加に失敗しました`,
      });
    }
  }
});

  client.on("messageReactionAdd", async (reaction, user) => {
    try {
    if (reaction.message.partial) await reaction.message.fetch();
    const panelData = rolePanelData[reaction.message.id];
    if (!panelData || user.bot) return;
  
    const roleIndex = panelData.emojis.indexOf(reaction.emoji.name);
    if (roleIndex === -1) return;
  
    const roleId = panelData.roles[roleIndex];
    const member = reaction.message.guild.members.cache.get(user.id);
    const role = reaction.message.guild.roles.cache.get(roleId);
  
    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId);
  
      const removeEmbed = new MessageEmbed()
        .setDescription(`<@&${roleId}>のロールを解除しました`)
        .setColor("RANDOM")
        .setTimestamp();
  
      const removeMessage = await reaction.message.channel.send({
        content: `<@${user.id}>`,
        embeds: [removeEmbed],
      });
      setTimeout(() => removeMessage.delete(), 5000);
    } else {
      await member.roles.add(roleId);
  
      const addEmbed = new MessageEmbed()
        .setDescription(`<@&${roleId}>のロールを付与しました`)
        .setColor("RANDOM")
        .setTimestamp();
  
      const addMessage = await reaction.message.channel.send({
        content: `<@${user.id}>`,
        embeds: [addEmbed],
      });
      setTimeout(() => addMessage.delete(), 5000);
    }
  
    await reaction.users.remove(user.id);
    } catch (e) {
  console.log(e);
}
  });
//ここまで
try {
  client.login(process.env.DISCORD_TOKEN);
} catch (e) {
  console.log(e);
}