import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { update, read } from '../api/user'
import auth from '../auth/auth-helper'
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
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import useStyles from '../styles/stylesForm'
import { PhotoCamera } from '@material-ui/icons'

const EditProfile = ({ match }) => {
  const styles = useStyles()
  const jwt = auth.isAuthenticated()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
    photo: '',
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
          setValues({ ...values, name: data.name, email: data.email, about: data.about })
        }
      }
    )

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.userId])

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formSubmit = new FormData()
    values.name && formSubmit.append('name', values.name)
    values.email && formSubmit.append('email', values.email)
    values.password && formSubmit.append('passoword', values.password)
    values.about && formSubmit.append('about', values.about)
    values.photo && formSubmit.append('photo', values.photo)

    update({ userId: match.params.userId }, { t: jwt.token }, formSubmit)
      .then(data => {
        if (data && data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, open: true })
        }
      })
  }

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: name === 'photo'
        ? event.target.files[0]
        : event.target.value
    })
  }

  return (
    <>
      <Card className={styles.card}>
        <CardContent>
          <form onSubmit={handlerSubmit} className={styles.form}>
            <Typography className={styles.titleText}>Edit Profile</Typography>
            <TextField
              onChange={handleChange('email')}
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
              onChange={handleChange('name')}
              value={values.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
            />
            <TextField
              onChange={handleChange('about')}
              value={values.about}
              variant="outlined"
              multiline
              fullWidth
              rows="2"
              name="about"
              label="About"
              type="text"
              margin="normal"
              id="multiline-flexible"
            />
            <TextField
              onChange={handleChange('password')}
              value={values.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <input
              accept="image/*"
              onChange={handleChange('photo')}
              className={styles.inputPhoto}
              id="icon-button-file"
              name="photo"
              type="file"
            />
            <label htmlFor="icon-button-file">
                <IconButton color="secondary" className={styles.photoButton} component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <span className={styles.filename}>
                {values.photo ? values.photo['name'] : ''}
            </span>
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
        <DialogTitle>Edit Profile</DialogTitle>
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
