import { HashOptions } from 'crypto'
import { Document } from 'mongoose'

interface IProfile extends Document {
  hashed_password?: string | undefined
  salt?: HashOptions | undefined
  updated?: number
  following?: string[]
  photo?: {
    contentType?: string
    data?: string
  }
}

export interface IUserQuery<T = string> extends Document<any> {
  _id?: T
  userId?: T
  authenticate?: any
  name?: T
  email?: T
  unfollowId?: T
  followId?: T
  followers?: T
  password?: T
  hashed_password?: T | undefined
  salt?: HashOptions | undefined
}

export interface IRequest {
  body?: IUserQuery
  profile?: IProfile
  auth?: Document
  authenticate?: Function
}

export interface IUserApi<T = string> {
  token?: T
  user?: {
    _id: T
    email: T
    password: T
  }
  error?: T
}
