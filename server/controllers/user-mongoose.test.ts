import mongoose, { Document } from 'mongoose'
import UserModel from '../models/User'
import config from '../../config/config'

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

interface testData extends Document<any> {
    _id?: any,
    name?: string,
    email?: string,
    password?: string,
}

describe('User Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(config.mongoUri,
            {
                useNewUrlParser: true,
                useCreateIndex: true
            }, (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(TEST_USER);
        const savedUser: testData = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(TEST_USER.name);
    });

    it('delete created user', async () => {
        const removeUser = await UserModel.remove({ name: TEST_USER.name })

        expect(removeUser).not.toBeNull()
    })
    
})
