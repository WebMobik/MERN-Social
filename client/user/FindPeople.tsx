import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {findPeople, follow} from '../api/user'
import auth from './../auth/auth-helper'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Typography,
  Snackbar
} from '@material-ui/core'
import ViewIcon from '@material-ui/icons/Visibility'
import useStyles from '../styles/stylesForm'

const FindPeople: React.FC = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setValues({...values, users:data})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

  const clickFollow = (user, index) => {
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        let toFollow = values.users
        toFollow.splice(index, 1)
        setValues({...values, users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }

  const handleRequestClose = () => {
    setValues({...values, open: false })
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
          <Typography className={classes.titleText}>
              Who to follow
          </Typography>
          <List>
          {values.users.map((item, i) => (
            <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                      <Avatar src={'/api/users/photo/'+item._id}/>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction>
                    <Link to={"/user/" + item._id}>
                      <IconButton color="secondary">
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={()=> {clickFollow(item, i)}}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
            </span>
          ))}
          </List>
      </Paper>
      <Snackbar
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={<span>{values.followMessage}</span>}
      />
    </div>
  )
}

export default FindPeople
