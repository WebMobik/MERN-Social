import API from "./api-helper"
import { headersApi } from "../helpers"

const api = new API()

const create = async (user) => {
  const response = await api.post(
    '/api/users/',
    headersApi(),
    JSON.stringify(user)
  )
  return response
}

const list = async (signal: AbortSignal) => {
  const response = await api.get(
    '/api/users/',
    headersApi(true),
    signal
  )
  return response
}

const update = async (params, credentials, user) => {
  const response = await api.put(
    '/api/users/' + params.userId,
    headersApi(true, credentials),
    JSON.stringify(user)
  )
  return response
}

const read = async (params: {userId: string}, credentials, signal: AbortSignal) => {
  const response = await api.get(
    '/api/users/' + params.userId,
    headersApi(true, credentials),
    signal
  )
  return response
}

const remove = async (params, credentials) => {
  const response = await api.delete(
    '/api/users/' + params.userId,
    headersApi(true, credentials)
  )
  return response
}

const findPeople = async (params: {userId: string}, credentials, signal: AbortSignal) => {
  const response = await api.get(
    '/api/users/findpeople/' + params.userId,
    headersApi(true, credentials),
    signal
  )
  return response
}

const follow = async (params: {userId: string}, credentials, followId) => {
  const response = await api.put(
    '/api/users/follow',
    headersApi(true, credentials),
    JSON.stringify({ userId: params.userId, followId })
  )
  return response
}

const unfollow = async (params: {userId: string}, credentials, unfollowId) => {
  const response = await api.put(
    '/api/users/unfollow',
    headersApi(true, credentials),
    JSON.stringify({ userId: params.userId, unfollowId })
  )
  return response
}

export { create, list, update, read, remove, findPeople, follow, unfollow }
