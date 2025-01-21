const express = require('express');
const app = express();
app.use(express.json());
const router= express.Router();
const dotenv = require('dotenv');
dotenv.config();
const port =process.env.PORT || 5000;

const {signup} = require('./routes/signup');
const {login} = require('./routes/login');

app.use('/api/user', router);
router.post('/signup',signup);
router.post('/login',login);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


