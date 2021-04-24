import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { read } from './api-user'
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Person, Edit } from '@material-ui/icons'
import useStyles from '../styles/stylesForm'

const Profile = ({ match }) => {
  const styles = useStyles()
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    created: '',
  })
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {
          setUser(data)
        }
      }
    )

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.userId])

  return !redirectToSignin ? (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h6" className={styles.titleText}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            {jwt.user && jwt.user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={'/user/edit/' + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={'Joined: ' + new Date(user.created).toDateString()}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  ) : (
    <Redirect to="/signin" />
  )
}

export default Profile
