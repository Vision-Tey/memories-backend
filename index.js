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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://memories-project-seven.vercel.app');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

// routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))


