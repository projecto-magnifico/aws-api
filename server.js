const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 3000; 
const apiRouter = require('./routes/apiRoutes');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRouter);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})

module.exports = app; 