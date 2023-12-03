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

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res, next) => {
  
  const { userName, email, password } = req.body;

  try {

    const formData = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    // saving the user
    const user = await User.create(formData);

    // creating and associating cart
    const cart = await Cart.create();
    await user.setCart(cart);
    
    if (user) {

      const userData = await User.findOne({
        attributes: ['userName', 'email'],
        where: {
          id: user.id
        }
      });

      req.session.user = userData;
      req.session.authenticated = true;
      req.session.save();
      console.log(req.session);
      userData.newUser = true;
      res.status(201).send(userData);
    } else {
      return res.status(409).send("Registration failed");
    }
  } catch (error) {
    console.log(error);
  }
};

// login authentication
const login = async (req, res) => {
  
  const { userName, password } = req.body;

    try {

      // find a user by their email
      const user = await User.findOne({
          where: {
              userName: userName
          }
      });

      // if user email is found, compare with bcrypt
      if (user) {

          const isSame = await bcrypt.compare(password, user.password);

          // if password is the same generate token with the users's id and the secretKey in the env file
          if (isSame) {

            const userData = await User.findOne({
              attributes: ['userName', 'email'],
              where: {
                id: user.id
              }
            });

              req.session.user = userData;
              req.session.authenticated = true;
              req.session.save();
              console.log(req.session);
              return res.status(200).send(userData);
          } else {
              return res.status(401).send("incorrect email or password");
          }
      } else {
          return res.status(401).send("incorrect email or password");
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
  if (req.session.authenticated === true) {
    // res.clearCookie('connect.sid');
    req.session.destroy();
    console.log(req.session);
    res.send('logged out');
  } else {
    console.log(req.session);
    res.send('not signed in');
  }
};

module.exports = {
    signup,
    login,
    persistLogin,
    sessionStatus,
    logout
};