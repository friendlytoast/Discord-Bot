const Discord = require('discord.js');
const bot = new Discord.Client();

const ytdl = require("ytdl-core");

const token = 'NjM4MTY5ODUyMzE3NTMyMTcw.XbjDGQ.4DoBeHFg6HntbVTxffyhrUTLeF4';

const PREFIX = '?';

var servers = {};

bot.on('ready', () =>{
    console.log('This bot is online!');
	bot.user.setActivity('with myself', { type: 'PLAYING'}).catch(console.error);

})
	
bot.on('guildMemberAdd', member =>{

	const channel = member.guild.channels.find(channel => channel.name === "welcome");
	if(!channel) return;

	channel.send('Welcome to the gay place called Beefless, have fun and just enjoy yourself')
});

bot.login(token).catch(err => console.log(err));

	
bot.on('message' , msg=>{
	if(msg.content === "mommy"){
		msg.reply('https://imgur.com/AzyH9nk');
	}
})

bot.on('message', message=>{

	let args = message.content.substring(PREFIX.length).split(" ");
	
	switch(args[0]) {
		case 'jackiesnackie':
			message.channel.send('Late Middle English: from Jack, pet form of the given name John . The term was used originally to denote an ordinary man, also a youth, hence the knave in cards and male animal. The word also denoted various devices saving human labor, as though one had a helper, and in compounds such as jackhammer and jackknife. The general sense laborer arose in the early 18th century and survives in cheapjack, lumberjack, steeplejack, etc. Since the mid 16th century a notion of smallness has arisen')
		break;
		case 'twitch':
			message.channel.send('https://www.twitch.tv/jaackales/')
		break;
		case 'embed':
			const embed = new Discord.RichEmbed()
			.setTitle('User Information')
			.addField('Player Name', message.author.username)
			.addField('Current Server', message.guild.name)
			.setThumbnail(message.author.avatarURL)
			.setColor(0x31BDF7)
			message.channel.send(embed);
		case 'play':
			 
			function play(connection, message){
				var server = servers[message.guild.id];
				
				server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

				server.queue.shift();

				server.dispatcher.on("end", function(){
					if(server.queue[0]){
						play(connection, message);
					}else {
						connection.disconnect();
					}
				});
			

			}
			 
			 if(!args[1]){
				message.channel.send("lmao you did wrong (Incorrect link, provide a link)");
				return;
			 }
			 
			 if(!message.member.voiceChannel){
				 message.channel.send("You must be in a channel to play the bot");
				 return;
			 }

			 if(!servers[message.guild.id]) servers[message.guild.id] = {
				 queue: []
			 }
			 		
			 var server = servers[message.guild.id];

			 server.queue.push(args[1]);

			 if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
				play(connection, message);
			 })
		
		
		
		
		break;

		case 'skip':
			var server = servers[message.guild.id];
			 if(server.dispatcher) server.dispatcher.end();
			 message.channel.send("Skipping the song")
		break;

		case 'stop':
			var server = servers[message.guild.id];
			 if(message.guild.voiceConnection){
				 for(var i = server.queue.length -1; i >=0;i--){
					 server.queue.splice(i, 1);
				 }

				 server.dispatcher.end();
				 message.channel.send("Ending the queue, leaving the voice channel")
				 console.log('Stopping the queue')
			 }

			 if(message.guild.connection) message.guild.voiceConnection.disconnect();
		break;
	
	
	}
})

bot.login(token);