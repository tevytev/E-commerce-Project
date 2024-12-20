const express = require("express");
const userController = require("../Controllers/registrationController");
const {
  sessionStatus,
  persistLogin,
  logout,
} = require("../Controllers/registrationController");
const { getUserInfo, editUserInfo } = require("../Controllers/userController");
const userAuth = require("../Middleware/userMiddleware/userAuth");
const passport = require("passport");

// userAuth.userAuthorization < Add this back to user info and update

const router = express.Router();

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

// auto login route
router.post("/persist", persistLogin);

router.get("/session", sessionStatus);

// logout route
router.get("/logout", userAuth.userAuthorization, logout);

// get specific user info
/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Retrieve user info that matches the given username
 *     description: Retrieve user info and credentials from database.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: String that matches a saved user's ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An object of the requested user.
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
router.get("/:userId", getUserInfo);

// update user info
/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Edit active user's info
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
 *                 example: NewUserName
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: NewEmail@example.com
 *     description: Update user info and return updated user credentials from database.
 *     responses:
 *       201:
 *         description: An object of the updated user credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: NewUserName
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: NewEmail@example.com
 */
router.put("/update", editUserInfo);

router.post("/persist", (req, res) => {
  if (req.user || req.session.authenticated === true) {
    res.send(req.user);
  } else {
    res.send("please sign in");
  }
});

module.exports = router;
