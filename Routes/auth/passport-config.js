const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../../Models/index');
const bcrypt = require('bcrypt');

// assigning users to the variable User
const User = db.users; 


    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, 
    async (username, password, done) => {
        try{
            const user = await User.findOne({where: { username: username }})
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' }) 
            }
            const passVal = await bcrypt.compare(password, user.password);
            if (!passVal) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then(function(err, user) {
            if (err) return done(err);
            done(null, user); 
        });
    });

module.exports = initializePassport;