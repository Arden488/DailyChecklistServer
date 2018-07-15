const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, { polling: true });

new CronJob('00 01 * * * *', function() {
  bot.sendMessage(37053287, 'It\'s time to fill the checklist, brother!');
}, null, true, 'Europe/Kiev');

mongoose.connect('mongodb://dcdb_user:A1qKlZuMn6G4@ds239071.mlab.com:39071/daily-checklist');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
