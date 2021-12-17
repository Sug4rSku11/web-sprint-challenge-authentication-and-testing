
const User = require('../jokes/jokes-model')


const checkUsernameExists = async (req, res, next) => {
   
        const [user] = await User.findBy({ username: req.body.username })
        if(user){
            req.user = user
            next()
        } else {
            next({ status: 401, message: "invalid credentials"})
        }
    
}

async function checkUsernameFree(req, res, next) {
    
      const users = await User.findBy({ username: req.body.username})
      if(users.length) {
        next({status: 422, message: 'Username taken'})
      } else {
        next()
      }
  }

  module.exports = { checkUsernameExists,
                    checkUsernameFree,};