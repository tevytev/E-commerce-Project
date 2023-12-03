// importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { db } = require('./Models');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const path = require('path');
const genFunc = require('connect-pg-simple')
// const MemoryStore = require('memorystore')(session)


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API e-commerce application made with Express. It retrieves data from a postgres database.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'E-commerce Project',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// setting up port
const PORT = process.env.PORT;

// assigning the variable app to express
const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
  origin:'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: [
    "Set-Cookie",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "withCredentials"
  ]
};

app.use(cors(corsOptions));

// const memoryStore = new session.MemoryStore();

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DB_STORE_CONNECTION,
});

// 24 * 60 * 60 * 1000
app.use(
  session({
    secret: process.env.SECRETKEY,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: 'localhost'
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);

app.use('/api/users', userRoutes);

// routes for the product API
app.use('/api/products', productRoutes);

// routes for the cart API
app.use('/api/cart', cartRoutes);

// routes for the order API
app.use('/api/orders', orderRoutes);

// listening to server connection
app.listen(PORT, () => {
    console.log(`Server is connected on ${PORT}`)
});