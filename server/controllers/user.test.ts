import { MongoClient } from 'mongodb'
import UserModel from '../models/User'
import config from '../../config/config'
import userCtrl from './user.controller'

const TEST_USER = {
  name: 'TEST_USER',
  email: 'test@mail.ru',
  password: '123123',
}

const TEST_UPDATE = {
  name: 'TEST',
  email: 'update@mail.ru',
  password: '123qwe',
  about: 'about test some user...',
}

describe('test to get users list', () => {
  let connection
  let db
  let users

  beforeAll(async () => {
    connection = await MongoClient.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db(config.dbName)
    users = db.collection('users')
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  it('should find a doc into collection', async () => {
    const findUser = await users.findOne({ name: 'Mobik' })
    expect(findUser.name).toEqual('Mobik')
  })

  it('create and update doc', async () => {
    const user = new UserModel(TEST_USER)
    await users.insertOne(user)

    const findTestUser = await users.findOne({ name: TEST_USER.name })
    expect(findTestUser.name).toEqual(TEST_USER.name)

    const updateUser = await users.updateOne(
      { name: TEST_USER.name },
      { $set: TEST_UPDATE }
    )

    expect(updateUser['matchedCount']).toEqual(1)
  })

  it('delete created doc', async () => {
    const deleteUser = await users.deleteOne({ name: TEST_UPDATE.name })
    expect(deleteUser['deletedCount']).toEqual(1)
  })
})
