import React, { ChangeEvent, MouseEventHandler, useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper'
import { signin } from '../api/auth'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles/stylesForm'

const SignIn: React.FC = () => {
  const styles = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: null,
    redirectToRefresh: false,
  })

  const handlerSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    }
    
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToRefresh: true })
        })
      }
    })
  }

  const handlerChange = (name: string) => (event: ChangeEvent<{ value: string }>) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return !values.redirectToRefresh ? (
    <Card className={styles.card}>
      <CardContent>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={styles.titleText}>
          Sign in
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Redirect to="/" />
  )
}

export default SignIn
