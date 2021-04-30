import { headersApi } from "../helpers"

const create = async (params, credentials, post: FormData) => {
    try {
        const response = await fetch('/api/posts/new/' + params.userId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + credentials.t
            },
            body: post,
        })
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}

const photo = async (params, credentials, signal: AbortSignal) => {
    try {
        const response = await fetch('/api/posts/photo/' + params.postId, {
            method: 'GET',
            signal,
            headers: headersApi(credentials),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const listByUser = async (params, credentials, signal: AbortSignal) => {
    try {
        const response = await fetch('/api/posts/by/' + params.userId, {
            method: 'GET',
            signal,
            headers: headersApi(credentials),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const listNewsFeed = async (params, credentials, signal: AbortSignal) => {
    try {
        const response = await fetch('/api/posts/feed/' + params.userId, {
            method: 'GET',
            signal,
            headers: headersApi(credentials),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const like = async (params, credentials, postId) => {
    try {
        const response = await fetch('/api/posts/like', {
            method: 'PUT',
            headers: headersApi(credentials),
            body: JSON.stringify({userId: params.userId, postId}),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const unlike = async (unlike) => {
    try {
        const response = await fetch('/api/posts/unlike', {
            method: 'PUT',
            headers: headersApi(),
            body: JSON.stringify(unlike),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const comment = async (params, credentials, postId, comment) => {
    try {
        const response = await fetch('/api/posts/comment', {
            method: 'PUT',
            headers: headersApi(credentials),
            body: JSON.stringify({userId: params.userId, postId, comment}),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const uncomment = async (uncomment) => {
    try {
        const response = await fetch('/api/posts/uncomment', {
            method: 'PUT',
            headers: headersApi(),
            body: JSON.stringify(uncomment),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

const remove = async (params, credentials) => {
    try {
        const response = await fetch('/api/posts/' + params.postId, {
            method: 'DELETE',
            headers: headersApi(credentials),
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
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
