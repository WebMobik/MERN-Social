import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { update, read } from './api-user'
import auth from '../auth/auth-helper'
import useStyles from '../styles/stylesForm'

const EditProfile = ({ match }) => {
  const styles = useStyles()
  const jwt = auth.isAuthenticated()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    open: false,
  })

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, name: data.name, email: data.email })
        }
      }
    )

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.userId])

  const handlerSubmit = (e) => {
    e.preventDefault()
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    }
    update({ userId: match.params.userId }, { t: jwt.token }, user).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, open: true })
        }
      }
    )
  }

  const handlerChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <>
      <Card className={styles.card}>
        <CardContent>
          <form onSubmit={handlerSubmit} className={styles.form}>
            <Typography className={styles.titleText}>Edit Profile</Typography>
            <TextField
              onChange={handlerChange('email')}
              value={values.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handlerChange('name')}
              value={values.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="current-name"
            />
            <TextField
              onChange={handlerChange('password')}
              value={values.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Divider />
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error">error</Icon>
                {values.error}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              className={styles.btnSuccess}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>Edite Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Profile successfully edited.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary" variant="contained">
              Main Page
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditProfile
