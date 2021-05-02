import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { read } from '../api/user'
import { listByUser } from '../api/post'
import FollowProfileButton from './FollowProfileButton'
import DeleteUser from './DeleteUser'
import auth from '../auth/auth-helper'
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import useStyles from '../styles/stylesForm'
import { StateComponentT, UserT, PostT, DataT } from './types'
import ProfileTabs from './ProfileTabs'

const Profile = ({ match }) => {
  const styles = useStyles()
  const [state, setState] = useState<StateComponentT>()
  const [user, setUser] = useState<UserT>()
  const [posts, setPosts] = useState<PostT[]>()
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read(
      { userId: match.params.userId },
      { t: jwt.token },
      signal
      ).then((data: DataT) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {
          const following = checkFollow(data)
          setUser({...user, ...data, following: following})
          loadPosts(data._id)
          setUser(data)
        }
      })

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.userId])

  const checkFollow = (user: UserT) => {
    const match = user.followers.some((follower)=> {
      return follower._id == jwt.user._id
    })
    return match
  }

  const clickFollowButton = (callApi) => {
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data: DataT) => {
      if (data.error) {
        setState({...state, error: data.error})
      } else {
        setUser({...user, ...data, following: !user.following})
      }
    })
  }

  const loadPosts = (user: UserT['_id']) => {
    listByUser(
      {userId: user},
      {t: jwt.token}
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
  }

  const removePost = (post: PostT) => {
    const updatedPosts = posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }

  const photoUrl = user._id
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : '/api/users/defaultphoto'

    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Paper className={styles.root} elevation={4}>
        <Typography variant="h6" className={styles.titleText}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={styles.bigAvatar}/>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email}/> {
             jwt.user && jwt.user._id == user._id
             ? (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id}/>
                </ListItemSecondaryAction>)
            : (<FollowProfileButton following={user.following} onButtonClick={clickFollowButton}/>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={user.about} secondary={"Joined: " + (
              new Date(user.created)).toDateString()}/>
          </ListItem>
        </List>
        <ProfileTabs user={user} posts={posts} removePostUpdate={removePost}/>
      </Paper>
    )
}

export default Profile
