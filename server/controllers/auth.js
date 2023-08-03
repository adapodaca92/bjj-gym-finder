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
            console.log(req.session);
            const validPass = bcrypt.compareSync(password, user.password);

            if (validPass && req.session.authorized) {
                res.redirect('/');
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
        console.log(req.body);
        const { username, password, email } = req.body;
        try {
            const userDoc = await User.create({
                username,
                email,
                password: bcrypt.hashSync(password, salt),
            })
            res.redirect('/login');
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
      }
}

  