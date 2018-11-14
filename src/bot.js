const linebot = require('linebot');
const bot_API = require('./botAPI');
const watson = require('./watson');
const chinese2num = require('./chinese2number');
// const async = require("async");
const backend = require('./backend');
require('dotenv').config();

const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken:process.env.CHANNEL_ACCESS_SECRET,
	verify: true // default=true
});


// backend.init();

bot.on('message', function (event) {
	var chat_id = event.source.userId;
	switch (event.message.type) {
		case 'text':   
			msg = chinese2num.parse(event.message.text);	
			watson.callWatsonAPI(msg, event);
			console.log(msg);
			break;
		case 'image':
			console.log('got image');
			event.reply({
				"type": "image",
				"originalContentUrl": "https://i.imgur.com/Igi7KgR.jpg",
				"previewImageUrl": "https://i.imgur.com/Igi7KgR.jpg"
			});
			// event.message.content().then(function (data) {
			// 	const s = data.toString('base64').substring(0, 30);
			// 	return event.reply('Nice picture! ' + s);
			// }).catch(function (err) {
			// 	return event.reply(err.toString());
			// });
			break;
		case 'video':
			event.reply('Nice movie!');
			break;
		case 'audio':
			event.reply('Nice song!');
			break;
		case 'location':
			event.reply(['That\'s a good location!', 'Lat:' + event.message.latitude, 'Long:' + event.message.longitude]);
			break;
		case 'sticker':
			console.log('got sticker');
			break;
		default:
			event.reply('Unknow message: ' + JSON.stringify(event));
			break;
	}
});

bot.on('follow', function (event) {
	// event.reply('follow: ' + event.source.userId);
});

bot.on('unfollow', function (event) {
	// event.reply('unfollow: ' + event.source.userId);
});

bot.on('join', function (event) {
	// event.reply('join: ' + event.source.groupId);
});

bot.on('leave', function (event) {
	// event.reply('leave: ' + event.source.groupId);
});

bot.on('postback', function (event) {
	// callback events
	BOT_STATE = bot_API.event_callback(event, event.postback.data);
	console.log(BOT_STATE);
});

bot.on('beacon', function (event) {
	event.reply('beacon: ' + event.beacon.hwid);
});

bot.listen('/webhook', process.env.PORT || 6699, function () {
	console.log('LineBot is running.');
});



// setInterval(getCoinInfo, 60000);
