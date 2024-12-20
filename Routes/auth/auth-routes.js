const express = require("express");
const { signup, logout } = require("../../Controllers/registrationController");
const passport = require("passport");

// userAuth.userAuthorization < Add this back to user info and update
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const router = express.Router();

// router.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     next();
// });

// User component
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's ID.
 *           example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *         userName:
 *           type: string
 *           description: The user's username.
 *           example: Cookie123
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: Cookie@/example.com
 *         createdAt:
 *           type: string
 *           description: The user's creation date and time.
 *           example: Sep 25 21:21:42 -04
 *         updatedAt:
 *           type: string
 *           description: The user's latest update date and time.
 *           example: 2023-09-25 21:21:42.581-04
 */

// signup endpoint
// passing the middleware function to the signup
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's username.
 *                 example: Cookie123
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: Cookie@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: fakepassword543
 *     description: Sign up user to app and return user credentials from database.
 *     responses:
 *       201:
 *         description: An object of the signed up user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: Cookie123
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: Cookie@example.com
 *
 */
router.post("/signup", signup);

// login route
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: Cookie@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: fakepassword543
 *     description: Login user to app and return user credentials from database.
 *     responses:
 *       201:
 *         description: An object of the logged in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: Cookie123
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: Cookie@example.com
 */
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.session.passport.user);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://tevdev-ecommerce.com/home",
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    if (req.session.passport) {
      console.log(req.session.passport.user);
    }
  }
);

router.get("/auth/failure", (req, res) => {
  res.send("something went wrong..");
});

router.get("/persistOAuth", (req, res) => {
  if (req.session.passport) {
    res.json(req.session.passport.user);
  } else {
    res.sendStatus(401);
  }
});

// logout route
router.post("/logout", logout);

module.exports = router;
