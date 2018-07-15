require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, { polling: true });

new CronJob('00 00 21 * * *', function() {
  bot.sendMessage(37053287, 'It\'s time to fill the checklist, brother!');
}, null, true, 'Europe/Kiev');
