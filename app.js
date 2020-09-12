'use strict';

const express = require('express');
const routes = require('./routes/employees');
const app = new express();
const PORT = 3000;

app.use('/api/employees', routes);

app.listen(PORT, () => console.log('listening at', PORT));
