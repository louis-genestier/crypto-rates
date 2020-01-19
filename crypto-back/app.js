require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api.router');

const app = express();

app.use(cors());
app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => { console.log(`Server listening on ${process.env.PORT}`) });

module.exports = app;
