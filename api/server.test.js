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

describe('[POST] /api/users', () => {

    const user1 = ({ username: 'bozotheclown19', password: '1234', email: 'notrealemail' })
    const user2 = ({ username: 'trickytheclown22', password: 'password', email: 'email' })
    

    it('responds with status [201]', async () => {
        const res = await request(server).post('/api/users').send(user1)
        expect(res.status).toBe(201)
    })
    it('creates a new user in database', async () => {
        expect(await db('users')).toHaveLength(0)
        await request(server).post('/api/users').send(user1)
        expect(await db('users')).toHaveLength(1)
    })
    it('resolves to a new user', async () => {
        const res = await request(server).post('/api/users').send(user1)
        expect(res.body).toEqual(user1)
    })
})