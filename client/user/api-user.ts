import { headersApi } from "../helpers"

const create = async (user) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: headersApi(),
      body: JSON.stringify(user),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal: AbortSignal) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, user) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: headersApi(credentials),
      body: JSON.stringify(user),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params: {userId: string}, credentials, signal: AbortSignal) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal,
      headers: headersApi(credentials),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: headersApi(credentials),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, list, update, read, remove }
