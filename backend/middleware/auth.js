const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'FUHZEFBEZFHBEAFBE')
    const userId = decodedToken.userId
    console.log('id from Auth')
    console.log(userId)
    req.auth = { userId}
    next()
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};