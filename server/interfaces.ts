import { ObjectId } from 'bson'
import { HashOptions } from 'crypto'
import { Document, Schema } from 'mongoose'

interface IDocument<T> extends Document<T> {
  encryptPassword: Function
  hashed_password: string
  salt: HashOptions
}

export interface PostDoc extends Document<any> {
  postedBy?: ObjectId
  photo?: {
    data: Buffer
    contentType: string
  }
}

export interface IUserDoc extends Schema {
  methods: { [name: string]: (this: IDocument<any>, ...args: any[]) => any }
}

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
  postId?: T
  authenticate?: any
  name?: T
  email?: T
  password?: T
  hashed_password?: T | undefined
  salt?: HashOptions | undefined
  unfollowId?: T
  followId?: T
  followers?: T
  comment?: {
    _id: T
    postedBy: T
  }
}

export interface IRequest {
  body?: IUserQuery
  profile?: IProfile
  auth?: Document
  authenticate?: Function
  post?: {
    remove: Function
    photo?: {
      data: Buffer
      contentType: string
    }
    postedBy?: {
      _id: string
    }
  }
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
