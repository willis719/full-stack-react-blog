var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// async makes everything run in order
router.post('/register', async (req, res) => {
  // check for username and password on request
  if (!req.body.username || !req.body.password) {
    // add a return so that it stops if condition is met
    return res.status(400).json({               
      error: 'Please include username and password'
    })
  }

  // check database for existing user
  // Nothing after this runs until this is finished
  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
    
  // if exists, send error
  if (user) {
    return res.status(400).json({
      error: 'Username already in use'
    })
  }

  
  // hash password
  const hash = await bcrypt.hash(req.body.password, 10)

  // create user
  const newUser = await models.User.create({
    username: req.body.username,
    password: hash
  })

  // respond with success message
  return res.status(201).json(newUser)

})  

module.exports = router;
