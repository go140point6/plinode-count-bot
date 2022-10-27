require('dotenv').config() // Load .env file
const { Client, Intents } = require('discord.js')

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS)

// Create a new client instance
const client = new Client({ intents: myIntents })

const deadline = 'Oct 31 2022 08:41:41 UTC';

console.log(deadline);

function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

console.log(getTimeRemaining(deadline).total);
console.log(getTimeRemaining(deadline).days);
console.log(getTimeRemaining(deadline).hours);
console.log(getTimeRemaining(deadline).minutes);
console.log(getTimeRemaining(deadline).seconds);

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    clock.innerHTML = 'days: ' + t.days + '<br>' +
                      'hours: '+ t.hours + '<br>' +
                      'minutes: ' + t.minutes + '<br>' +
                      'seconds: ' + t.seconds;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  },1000);
}

console.log(initializeClock('clockdiv', deadline));


/*
async function getDate () {
  let dateNow = 
  console.log(moment.utc(moment(firstDate,"DD/MM/YYYY HH:mm:ss").diff(moment(secondDate,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"))
  
  let nodes = res.dashboard.node.toString()
  let inactive = res.dashboard.inactive.toString()
  //console.log('Nodes:', res.dashboard.node.toString())
  //console.log('Inactive:', res.dashboard.inactive.toString())
  console.log(`Nodes: ${nodes}`)
  console.log(`Inactive: ${inactive}`)
  client.user.setPresence({
    activities: [{
      name: `Countdown: ${inactive}`,
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
  setInterval(getNodes, Math.max(1, process.env.UPDATE_FREQUENCY || 1) * 60 * 1000)
})
*/

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
