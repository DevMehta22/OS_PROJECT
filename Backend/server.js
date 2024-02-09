require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes= require('./Routes/routes');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api',routes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});