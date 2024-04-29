const express = require('express')
const app = express()

//rotas 

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.listen(3000, ()=> {
    console.log("Node API app is runninng on port 3000");
})