import React, { ChangeEvent, MouseEventHandler, useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper'
import { signin } from './api-auth'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core'
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
        <Typography className={styles.titleText}>Sign In</Typography>
        <form onSubmit={handlerSubmit} className={styles.form}>
          <TextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handlerChange('email')}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handlerChange('password')}
            placeholder="Password"
            margin="normal"
          />
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={styles.btnSuccess}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Redirect to="/" />
  )
}

export default SignIn
