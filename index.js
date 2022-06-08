require('dotenv').config() // Load .env file
const { Client, Intents } = require('discord.js')

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS)

// Create a new client instance
const client = new Client({ intents: myIntents })

var node

async function getNodes () {
  res = await fetch('https://oracles.goplugin.co/api/nodesetting/nodelist').then(response => response.json())
  let nodes = res.dashboard.node.toString()
  let inactive = res.dashboard.inactive.toString()
  //console.log('Nodes:', res.dashboard.node.toString())
  //console.log('Inactive:', res.dashboard.inactive.toString())
  console.log(`Nodes: ${nodes}`)
  console.log(`Inactive: ${inactive}`)
  client.user.setPresence({
    activities: [{
      name: `Inactive: ${inactive}`,
      type: `WATCHING`
      }]
    })
  
  client.guilds.cache.find(guild => guild.id === process.env.SERVER_ID).me.setNickname(`Total Nodes: ${nodes}`)
}

// Runs when client connects to Discord.
client.on('ready', () => {
  console.log('Logged in as', client.user.tag)
  getNodes() // Ping server once on startup
  // Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
  // Keep at minimum 1 hour, no need to do it more frequently
  setInterval(getNodes, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
