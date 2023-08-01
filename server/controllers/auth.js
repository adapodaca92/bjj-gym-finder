const passport = require('passport')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const User = require('../models/User')
// const validator = require('validator')


module.exports = {
    getLogin: (req, res) => {
        // if (req.user) {
        //   return res.redirect('/')
        // }
        res.render('login', {
          title: 'Login'
        })
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

  