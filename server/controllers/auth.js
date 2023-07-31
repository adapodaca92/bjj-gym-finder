const passport = require('passport')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
// const validator = require('validator')
const User = require('../models/User')

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
        const { username, password } = req.body;
        try {
            const userDoc = await User.create({
                username,
                password: bcrypt.hashSync(password, salt),
            })
            res.json(userDoc);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
      }
}

  