require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL 



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//rotas 
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send("Hello Blog")
})

app.use(errorMiddleware);

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.7uesfnx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`E-commerce está rodando na porta ${PORT}`);
        })
        console.log("Conectado ao MongoDB");
    }).catch((error) => {
        console.log(error);
    })