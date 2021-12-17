const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const User = require('../api/jokes/jokes-model')



// Write your tests here
test('sanity', () => {
  expect(true).not.toBe(false)
})

//2 tests per api endpoint

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
// beforeEach(async () => {
//   await db.seed.run()
// })
afterAll(async () => {
  await db.destroy() // disconnects from db
})

it('is the correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('Users Router', () => {
  describe('[GET] /', () => {
    let res
    beforeAll(async () => {
      res = await request(server).get('/')
    })
    it('Responds with 200 OK', async ()=> {
      expect(res.status).toBe(200)
    })
  })

})//users router

describe('Users Model', () => {
  describe('findById', () =>{
    let result 
    beforeAll(async ()=> {
      result = await User.findById(1)
    })
    it('Can fetch one user from `users`', async () => {
      expect(result).toHaveLength(1)
    })
  })
  describe('insert', () => {
    it('creates a new user in db', async () =>{
      await User.insert({ username: 'Hulk', password: 0987 })
      const [Hulk] = await db('users').where('id', 3)
      expect(Hulk).toMatchObject({ id: 3, username: 'Hulk'})
    })
  })
})