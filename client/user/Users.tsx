import React, { useEffect, useState } from 'react'
import { list } from '../api/user'
import Loader from '../components/Loader'
import UsersList from '../components/UsersList'

const Users: React.FC = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    setLoading(true)

    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    setLoading(false)

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return !loading ? (
    <UsersList title="Users List" users={users} />
  ) : (
    <Loader />
  )
}

export default Users
