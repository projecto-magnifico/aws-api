const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const PORT = 3000; 
const apiRouter = require('./routes/apiRoutes');

app.use(bodyParser.json());
app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})

module.exports = app; 