require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const productRoute = require('./routes/productRoute');
const paymentRoute = require('./routes/paymentRoute'); // Adicione a nova rota
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/api/products', productRoute);
app.use('/api/payment', paymentRoute); // Use a nova rota

app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send("Hello Blog");
});

app.use(errorMiddleware);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`E-commerce está rodando na porta ${PORT}`);
    });
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
