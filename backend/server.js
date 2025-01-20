const express = require('express');
const app = express();
app.use(express.json());
const router= express.router();


app.use('/api/user', router);


