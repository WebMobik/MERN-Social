import { headersApi } from "../helpers"
import API from "./api-helper"

const api = new API()

const signin = async (user) => {
    const response = await api.post(
        '/auth/signin/',
        headersApi(true),
        JSON.stringify(user)
    )
    return response
}

const signout = async () => {
    const response = await api.get(
        '/auth/signout/',
        headersApi(true)
    )
    return response
}

export {
    signin,
    signout
}
