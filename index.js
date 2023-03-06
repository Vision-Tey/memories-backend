const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')


const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))


