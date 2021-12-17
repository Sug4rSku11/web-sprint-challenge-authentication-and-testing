const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')



// Write your tests here
test('sanity', () => {
  expect(true).not.toBe(false)
})

//2 tests per api endpoint

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