import { ObjectId } from "mongoose"

export type CreateUserReq = {
    email: string
    name: string
    password: string
}

export type UserAuthReq = {
    email: string
    password: string
}

export type UserAuthRes = {
    token?: string
    user?: {
      _id: string
      name: string
      email: string
    }
    error?: string
}

export type HasAuthReq = {
    profile: {
        _id: string
    }
    auth: {
        _id: string
    }
}

export type UsersList = {
    name: string
    email: string
    updated: number
    created: Date
    error?: string
}

export type Follow = {
    userId: ObjectId,
    followId: string
}

export type Unfollow = {
    userId: string,
    unfollowId: string
}
