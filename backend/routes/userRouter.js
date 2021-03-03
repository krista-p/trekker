// const router = require('express').Router();
// const User = require('../models/user');

// router.post('/', async (req, res) => {
//   try {
//     const { email, password, passwordVerify } = req.body;

//     // validation
//     if (!email || !password || !passwordVerify) res.status(400).json({errorMessage: 'Enter all of the fields, please!'});
//     if (password.length < 6) res.status(400).json({errorMessage: 'Password must be at least 7 characters!'});
//     if (password !== passwordVerify) res.status(400).json({errorMessage: 'Passwords must match! Try again!'});

//     const prevUser = await User.findOne({email: email});
//     if (prevUser) res.status(400).json({errorMessage: 'There is already an account registered with this email!'});

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Whoops, our fault!');
//   }
// });

// module.exports = router;