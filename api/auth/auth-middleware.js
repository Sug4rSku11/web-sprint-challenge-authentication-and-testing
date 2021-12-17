const { JWT_SECRET } = require('../secrets/index')
const jwt = require('jsonwebtoken')
const User = require('../jokes/jokes-model')


const checkUsernameExists = async (req, res, next){
    try{
        const [user] = await User.findBy({ username: req.body.username })
        if(user){
            req.user = user
            next()
        } else {
            next({ status: 401, message: "invalid credentials"})
        }
    } catch (err){
        next(err)
    }
}

async function checkUsernameFree(req, res, next) {
    try{
      const users = await User.findBy({ username: req.body.username})
      if(!users.length) {
        next()
      } else {
        next({status: 422, message: 'Username taken'})
      }
  
     } catch (err){
       next(err)
     }
    
  }

  module.exports = { checkUsernameExists,
                    checkUsernameFree,}