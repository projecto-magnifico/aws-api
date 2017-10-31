const app = require('./server'); 
const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})