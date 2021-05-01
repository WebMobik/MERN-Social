import React, { useState } from 'react'
import { create } from '../api/user'
import { Link } from 'react-router-dom'
import {
  Avatar,
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles/stylesForm'

const SignUp: React.FC = () => {
  const styles = useStyles()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    open: false,
  })

  const handlerChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    const user = {
      email: values.email || undefined,
      name: values.name || undefined,
      password: values.password || undefined,
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', open: true })
      }
    })
  }

  return (
    <>
      <Card className={styles.card}>
        <CardContent>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={styles.titleText}>
          Sign Up
        </Typography>
          <form className={styles.form} onSubmit={handlerSubmit} >
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account succesfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="signin">
            <Button color="primary" variant="contained">
              Sign Up
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp
