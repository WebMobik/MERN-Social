import { headersApi } from "../helpers"
import API from "./api-helper";

const api = new API()

const create = async (params, credentials, post: FormData) => {
    const response = await api.post(
        '/api/posts/new/'+params.userId,
        headersApi(false, credentials),
        post
    )
    return response
}

const photo = async (params, credentials, signal: AbortSignal) => {
    const response = await api.get(
        '/api/posts/photo/'+params.postId,
        headersApi(true, credentials),
        signal
    )
    return response
}

const listByUser = async (params, credentials) => {
    const response = await api.get(
        '/api/posts/by/' + params.userId,
        headersApi(true, credentials)
    )
    return response
}

const listNewsFeed = async (params, credentials, signal: AbortSignal) => {
    const response = await api.get(
        '/api/posts/feed/' + params.userId,
        headersApi(true, credentials),
        signal
    )
    return response
}

const like = async (params, credentials, postId) => {
    const response = await api.put(
        '/api/posts/like',
        headersApi(true, credentials),
        JSON.stringify({userId: params.userId, postId})
    )
    return response
}

const unlike = async (params, credentials, postId) => {
    const response = await api.put(
        '/api/posts/unlike',
        headersApi(true, credentials),
        JSON.stringify({userId: params.userId, postId})
    )
    return response
}

const comment = async (params, credentials, postId, comment) => {
    const response = await api.put(
        '/api/posts/comment',
        headersApi(true, credentials),
        JSON.stringify({userId: params.userId, postId, comment})
    )
    return response
}

const uncomment = async (params, credentials, postId, uncomment) => {
    const response = await api.put(
        '/api/posts/uncomment',
        headersApi(true, credentials),
        JSON.stringify({userId: params.userId, postId, uncomment})
    )
    return response
}

const remove = async (params, credentials) => {
    const response = await api.delete(
        '/api/posts/'+params.postId,
        headersApi(true, credentials)
    )
    return response
}

export {
    create,
    photo,
    listByUser,
    listNewsFeed,
    like,
    unlike,
    comment,
    uncomment,
    remove
}
