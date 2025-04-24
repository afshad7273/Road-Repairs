
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  console.log(user);
  
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;