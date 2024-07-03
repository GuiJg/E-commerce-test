require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const productRoute = require('./routes/productRoute');
const paymentRoute = require('./routes/paymentRoute');
const authRoute = require('./routes/authRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const authMiddleware = require('./middleware/authMiddleware'); 

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Rotas
app.use('/api/products', productRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/auth', authRoute);

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

