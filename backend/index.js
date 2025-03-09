const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;


const cardRoute = require('./routes/CardRoute');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profileRoute');
const ocrRoute = require('./routes/ocrRoute');

connectDB();
app.use(cors());
app.use(express.json());


app.use('/card', cardRoute);
app.use('/auth', authRoute);
app.use('/api', profileRoute);
app.use('/api', ocrRoute);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});