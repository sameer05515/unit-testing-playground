const express = require('express');
const app = express();
const cors = require('cors');


// const request = require('request');
const router= require('./router/router');


app.use(cors());

app.use('/app', router);

app.listen(3000, () => console.log('Example app listening on port 3000!'));



