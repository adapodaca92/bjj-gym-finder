const passport = require('passport')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const User = require('../models/User')


module.exports = {
    getLogin: async (req, res) => {
        const userAuthorized =  await req.session.authorized;
        if (userAuthorized) {
          return res.redirect('/')
        }
        res.render('login', {
          title: 'Login'
        })
      },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (user === null) {
            res.status(400).json('User does not exist.');
        } else {
            req.session.user = user;
            req.session.authorized = true;
            const validPass = bcrypt.compareSync(password, user.password);

            if (validPass && req.session.authorized) {
                res.json(user);
            } else {
                res.status(400).json('Invalid Credentials.');
            }
        }
    },

    getSignup: (req, res) => {
        // if (req.user) {
        //   return res.redirect('/')
        // }
        res.render('signup', {
          title: 'Create Account'
        })
      },
    
      postSignup: async (req, res) => {
        try {
          const { email, password } = req.body;
    
          if (!email || !password) {
            return res.status(400).json('Both email and password are required.');
          }
    
          const hashedPassword = bcrypt.hashSync(password, salt);
          
          const user = await User.create({
            email,
            password: hashedPassword,
          });
    
          res.json(user);
        } catch(err) {
          console.error(err);
          res.status(400).json('An error occurred during registration.');
        }
    }
}

  