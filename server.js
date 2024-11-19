// importing modules
require('dotenv').config();
import express from 'express';
import sequelize from 'sequelize';
import cookieParser from 'cookie-parser';
import { db } from './Models';
import userRoutes from './Routes/userRoutes';
import authRoutes from './Routes/auth/auth-routes';
import productRoutes from './Routes/productRoutes';
import cartRoutes from './Routes/cartRoutes';
import orderRoutes from './Routes/orderRoutes';
import wishlistRoutes from './Routes/wishlistRoutes';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import session from 'express-session';
import { initialize, session as _session, serializeUser, deserializeUser, use } from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { compare } from 'bcrypt';
import genFunc from 'connect-pg-simple';
// const MemoryStore = require('memorystore')(session)
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const User = db.users;
const Cart = db.carts;
const Wishlist = db.wishlist;
const OAuthUser = db.oAuthUsers;

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
app.use('/docs', serve, setup(swaggerSpec));

// middleware
app.use(json());
app.use(urlencoded({ extended: false }));

const corsOptions = {
  origin:'https://tevdev-ecommerce.com',
  methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'https://tevdev-ecommerce.com');
  next();
})

app.use(cors(corsOptions));

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DB_CONNECTION,
  options: {
    ssl: {
      require: true,               // Enforce SSL
      rejectUnauthorized: false,   // Accept self-signed certificates
    }
  }
});

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    name: 'auth-cookie',
    proxy: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      domain: 'tevdev-ecommerce.com'
    }
  })
);

app.use(initialize());
app.use(_session());

serializeUser((user, done) => {
  return done(null, user);
});

deserializeUser(async (user, done) => {
  if (user?.providedId) {
    try {
      const deserializdeUser = await OAuthUser.findByPk(user.providedId);
      if (deserializdeUser) return done(null, deserializdeUser);
    } catch (error) {
      return done(error);
    }
  } else {
    try {
      const deserializedUser = await User.findByPk(user.id);
      if (deserializedUser) return done(null, deserializedUser);
    } catch (error) {
      return done(error);
    }
  }
});

const strategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, 
async (username, password, done) => {
  
    try{
        let user = await User.findOne({ where: { userName: username } })
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' }) 
        }
        const passVal = await compare(password, user.password);
        if (!passVal) {
            return done(null, false, { message: 'Incorrect password.' })
        }

        const userData = user;

        user = await User.findOne({
          attributes: ['userName', 'email', 'id'],
          where: {
            id: userData.id
          }
        });

        return done(null, user);

    } catch(err) {

        return done(err);

    }
  }
);

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://api.tevdev-ecommerce.com/api/users/google/callback",
  passReqToCallback   : true,
  proxy: true
},
async function(request, accessToken, refreshToken, profile, done) {

  try {
    const [user, created] = await OAuthUser.findOrCreate({
      where: { providedId: profile.id },
      defaults: {
        providedId: profile.id,
        userName: profile.displayName,
        email: profile.email,
        loginType: profile.provider,
      }
    });

    if (user) {
      if (created) {
        const cart = await Cart.create();
        await user.setCart(cart);

        const wishlist = await Wishlist.create();
        await user.setWishlist(wishlist);
      }
      return done(null, user);
    }

  } catch (error) {
    return done(error);
  }
})

use(strategy);
use(googleStrategy);

// routes for the user API
app.use('/api/users', authRoutes);

// // // routes for the product API
app.use('/api/products', productRoutes);

// // // routes for the cart API
app.use('/api/cart', cartRoutes);

app.use('/api/wishlist', wishlistRoutes);

// // // routes for the order API
// app.use('/api/orders', orderRoutes);

console.log(process.env.DB_CONNECTION)


// listening to server connection
app.listen(PORT, () => {
    console.log(`Server is connected on ${PORT}`)
});