const Discord = require('discord.js');

const Token = "process.env.TOKEN";

const { Client, Intents,} = require("discord.js");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});



let price_usd = "SOL is at $";
const sol_price = async () => {
  price = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    )
    .then(function (response) {
      price_usd = response.data["solana"]["usd"];
    })
    
};

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log("I'm up and running!");
  client.user.setActivity("composable world", { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
  const guildId = "879743531739131994";
  const guild = client.guilds.cache.get(guildId);

  if (message.content === "$price") {
    await sol_price();
    message.reply(`${price_usd}`);
  }
  else if (message.content === 'best?') {
    message.reply({
        content: 'Solana is the best!'
    });
}
});


//don't invite: https://discord.com/api/oauth2/authorize?client_id=966153093127495732&permissions=517543889984&scope=bot%20applications.commands