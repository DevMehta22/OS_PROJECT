
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes= require('./Routes/routes');
const prodConRoutes = require("./Routes/ProdConRoutes");

const port = 3000

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/srtn',routes);
app.use('/api/prodcon',prodConRoutes);


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});