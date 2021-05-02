import { ObjectId } from "mongoose"

type Follow = {_id: string, name: string}

export type StateComponentT = {
    error?: boolean | string
    loading?: boolean
    open?: boolean
}

export type UserT = {
    _id: ObjectId
    created: string
    email: string
    name: string
    password: string
    about: string
    following: Follow[]
    followers: Follow[]
    isFollowing: boolean
}

export type PostT = {
    _id: ObjectId
    text: string
    likes: ObjectId[]
    comments: {
        text: string
        created: Date
        postedBy: string
    }[]
    postedBy: {
        _id: string
        name: string
    }
    created: Date
    photo?: {
        data: Buffer
        contentType: string
    }
}

export type DataT = {
    error?: string
} & UserT
