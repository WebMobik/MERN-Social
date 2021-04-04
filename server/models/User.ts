import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { model, Schema } from 'mongoose'
import { UserSchemaDoc } from '../types'

const UserSchema = new Schema<UserSchemaDoc>({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  about: {
    type: String,
    trim: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  following: [{ type: ObjectId, ref: 'User' }],
  followers: [{ type: ObjectId, ref: 'User' }],
})

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHash('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

export default model<UserSchemaDoc>('User', UserSchema)
