// importing modules
const bcrypt = require('bcrypt');
const { db } = require('../Models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const store = require('../server')

dotenv.config();

// assigning users to the variable User and carts to variable Cart
const User = db.users;
const Cart = db.carts;
const Wishlist = db.wishlist;

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res, next) => {
  
  const { username, email, password } = req.body;

  try {

    const formData = {
      userName: username,
      email,
      password: await bcrypt.hash(password, 10),
    };

    // saving the user
    const user = await User.create(formData);

    // creating and associating cart
    const cart = await Cart.create();
    await user.setCart(cart);

    const wishlist = await Wishlist.create();
    await user.setWishlist(wishlist);
    
    if (user) {

      const userData = await User.findOne({
        attributes: ['userName', 'email', 'id'],
        where: {
          id: user.id
        }
      });

      req.session.user = userData;
      req.session.authenticated = true;
      req.session.save();
      console.log(req.session);
      res.status(201).send(userData);
    } else {
      return res.status(409).send("Username already registered");
    }
  } catch (error) {
    console.log(error);
  }
};

const sessionStatus = (req, res) => {
  res.send(req.session);
}

const persistLogin = (req, res) => {
  if (req.session.authenticated === true && req.session.user) {
    const user = req.session.user;
    return res.status(200).send(user);
  } else {
    return res.status(404).send('please sign back in');
  }
}

const logout = async (req, res) => {
  if (req.session.passport) {
    req.logout(() => {
        res.send('Logged out of passport');
    });
  } else if (req.session.authenticated) {
    req.session.destroy(() => {
        res.send('Logged out w/o passport');
    })
  } else {
    res.status(401);
  }
};

module.exports = {
    signup,
    persistLogin,
    sessionStatus,
    logout
};