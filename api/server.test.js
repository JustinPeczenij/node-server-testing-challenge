const db = require('../data/dbconfig')
const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('sanity', () => {
    test('Environment is correct', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

const user1 = ({ username: 'bozotheclown19', password: '1234', email: 'notrealemail' })
const user2 = ({ username: 'trickytheclown22', password: 'password', email: 'email' })

describe('[POST] /api/users', () => {

    it('responds with status [201]', async () => {
        const res = await request(server).post('/api/users').send(user1)
        expect(res.status).toBe(201)
    })
    it('creates a new user in database', async () => {
        const users = async () => await db('users')
        expect(await users()).toHaveLength(0)
        await request(server).post('/api/users').send(user1)
        expect(await users()).toHaveLength(1)
        await request(server).post('/api/users').send(user2)
        expect(await users()).toHaveLength(2)
    })
    it('resolves to a new user', async () => {
        const res = await request(server).post('/api/users').send(user2)
        expect(res.body).toEqual(user2)
    })
})

describe('[DELETE] /api/users', () => {
    it('responds with status [200]', async () => {
        await db('users').insert(user2)
        const res = await request(server).delete('/api/users').send({ username: 'trickytheclown22' })
        expect(res.status).toBe(200)
    })
    it('Deletes a user from the database', async () => {
        await db('users').insert(user2)
        await request(server).delete('/api/users').send({ username: 'trickytheclown22' })
        expect(await db('users')).toHaveLength(0)
    })
})