const express = require('express');
const connectToMongoDB = require('./db/connectToMongoDB');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', require('./routes/auth'))
app.use('/api/messages', require('./routes/message'))
app.use('/api/users', require('./routes/user'))

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
