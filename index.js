const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://dcdb_user:A1qKlZuMn6G4@ds239071.mlab.com:39071/daily-checklist');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
