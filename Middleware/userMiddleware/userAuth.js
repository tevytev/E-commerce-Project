
//importing modules
const express = require("express");
const {db} = require("../../Models");
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
//Assigning db.users to User variable
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {

  // if (req.session.authenticated) {
  //   return res.send('already authenticated');
  // }

  const { userName, email } = req.body
 //search the database to see if user exist
 try {
   const username = await User.findOne({
     where: {
       userName: userName,
     },
   });
   //if username exist in the database respond with a status of 409
   if (username) {
     return res.status(409).send("Username already registered");
    // next();
   }

   //checking if email already exist
   const emailcheck = await User.findOne({
     where: {
       email: email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (emailcheck) {
     return res.status(409).send("Email already registered");
    // next();
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

// const userAuthorization = async (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     try {
//       const data = jwt.verify(token, process.env.secretKey);
//       req.userId = data.id;
//       next();
//     } catch (error) {
//       console.log(error)
//     }
//   } else {
//     return res.status(401).send('Please sign up or login in order to continue');
//   }
// };

const userAuthorization = async (req, res, next) => {
  if (req.session.authenticated === true) {
    next();
  } else {
    res.sendStatus(400)
  }
};

//exporting module
 module.exports = {
  saveUser,
  userAuthorization,
};