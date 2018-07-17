const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');
// const TelegramBot = require('node-telegram-bot-api');

const db_addr = process.env.NODE_ENV === 'development' ? 
  process.env.DB_ADDR_LOCAL : 
  process.env.DB_ADDR_REMOTE;

mongoose.connect(db_addr);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
