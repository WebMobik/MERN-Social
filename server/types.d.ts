import { HashOptions } from 'crypto'
import { Document, ObjectId } from 'mongoose'

export interface IRequest<T = unknown> {
  body?: T
  profile?: UserProfile
  auth?: {
    _id: ObjectId
  }
  post?: PostSchemaDoc
}

export type ErrorRes = { error: string }

export type UserProfile = Document<ObjectId> & {
  name?: string
  email?: string
  about?: string
  created?: Date
  hashed_password?: string | undefined
  salt?: HashOptions | undefined
  updated?: number
  following?: ObjectId[]
  followers?: ObjectId[]
  photo?: {
    contentType?: string
    data?: Buffer
  }
  comment?: UserProfileComment
}

export type UserProfileComment = {
  _id: string | never
  postedBy: ObjectId
}

export type PostComment = {
  comment: UserProfileComment | never
  uncomment: UserProfileComment | never
  userId: ObjectId
  postId: ObjectId
}

export type PostLike = {
  postId: ObjectId,
  userId: ObjectId
}

export type UserSchemaDoc = UserProfile & {
  encryptPassword?: (val: string) => string
}

export type UserAuth = UserProfile & {
  authenticate?: (val: string) => { error: string }
}

export type PostSchemaDoc = Document & {
  text: string
  likes: ObjectId[]
  comments: {
    text: string
    created: Date
    postedBy: ObjectId
  }[]
  postedBy: {
    _id: ObjectId
    name: string
  } | ObjectId
  created: Date
  photo?: {
    data: Buffer
    contentType: string
  }
}

