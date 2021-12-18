const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const User = require('../api/jokes/jokes-model')

const { users: initialUsers } = require('../data/seeds/01-data')

// Write your tests here
test('sanity', () => {
  expect(true).not.toBe(false)
})


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

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
})

describe('[POST] /api/jokes/register', () => {
  it('creates a new user ', async () => {
    await request(server).post('/api/auth/register').send({ username: 'foo', password:'bar' })
    let users = await db('users')
    expect(users).toHaveLength(1)
    
  })
  // it('responds with the newly created user', async () => {
  //   let res = await request(server).post('/api/auth/login').send({ username: 'foo', password: 'bar' })
  //   expect(res.body).toMatchObject({username: 'foo' })
  // })
  it('responds with a 401 if missing name', async () => {
    let res = await request(server).post('/api/jokes').send({ random: 'thing' })
    expect(res.status).toBe(401)
  })
 
})

describe('[POST] /api/jokes/login', () => {
  it('logs in  user ', async () => {
    await request(server).post('/api/auth/login').send({ username: 'foo', password:'bar' })
    let users = await db('users')
    expect(users).toHaveLength(1)
    
  })
  it('responds with a 401 if missing name', async () => {
    let res = await request(server).post('/api/jokes').send({ random: 'thing' })
    expect(res.status).toBe(401)
  })
 
})