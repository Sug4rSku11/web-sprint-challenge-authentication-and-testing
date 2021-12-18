
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
        next({status: 422, message: 'username taken'})
      } else {
        next()
      }
  }

function checkUsernamePasswordEntered(req, res, next) {
    const { username, password } = req.body
    if(!username || !password) {
        next({ status: 401, message: 'username and password required'})
    } else {
        next()
    }
}

  module.exports = { checkUsernameExists,
                    checkUsernameFree,
                    checkUsernamePasswordEntered};