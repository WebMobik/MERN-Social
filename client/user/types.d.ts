type Follow = {_id: string, name: string}

export type StateComponentT = {
    error: string
    loading?: boolean
    open: boolean
}

export type UserT = {
    _id: string
    created: string
    email: string
    name: string
    password: string
    about: string
    following: boolean
    followers: Follow[]
}

export type PostT = {
    text: string
    likes: string[]
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
