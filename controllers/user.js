const User = require('../models/user');

const { body, validationResult } = require('express-validator');

let users = [];

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const reqUsers = req.body;
    users = [];

    reqUsers.forEach(user => {
      // TODO: check for duplicate users
      const { username, password, firstName, lastName, mobile, isActive } = user;  
      const u = new User(username, password, firstName, lastName, mobile, isActive);
      users.push(u);
    });

    console.log('users list :', users);

    const formattedUsers = users.map((user) => ({
      userName: user.username,
      isActive: user.isActive
    }));

    res.status(200).json({ message: "Users uploaded successfully" });
  } catch(err) {
    console.log('createUser: err:', err);
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { username, password } = req.body;

    const user = users.filter((user) => {
      return user.isActive && user.username === username && user.password === password;
    });

    console.log('user :', user);

    if (user.length > 0) {
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(404).json({ message: "Incorrect credentials" });
    }
  } catch (err) {
    console.log('login: err:', err);
    return next(err);;
  }
};

const validateUser = () => {
  return [ 
    body().isArray(),
    body('*.username', 'username doesn\'t exists').exists().isEmail(),
    body('*.password', 'password doesn\'t exists').exists(),
    body('*.firstName', 'firstName doesn\'t exists').exists(),
    body('*.lastName', 'lastName doesn\'t exists').exists(),
    body('*.mobile').exists().isInt(),
    body('*.isActive').exists().isBoolean(),
  ]
};

const validateLogin = () => {
  return [ 
    body('username', 'username doesn\'t exists').exists().isEmail(),
    body('password', 'password doesn\'t exists').exists(),
  ]
};

module.exports = {
  validateUser,
  validateLogin,
  createUser,
  login
};