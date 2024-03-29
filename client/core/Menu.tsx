import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import auth from '../auth/auth-helper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return { color: '#000000' }
    else
        return { color: '#ffffff' }
}

const Menu = withRouter(({ history }) => {
    const styles = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' color='inherit'>
                    MERN Social
                </Typography>
                <Link to='/'>
                    <Button style={isActive(history, '/')} className={styles.title}>Home</Button>
                </Link>
                {auth.isAuthenticated() && (
                    <>
                        <Link to='/users'>
                            <Button style={isActive(history, '/users')} className={styles.title}>
                                Users
                            </Button>
                        </Link>
                        <Link to={'/user/' + auth.isAuthenticated().user._id}>
                            <Button style={isActive(history, '/user/' + auth.isAuthenticated().user._id)}>
                                Profile
                            </Button>
                        </Link>
                        <Button style={isActive(history, '/signout')} color='inherit' onClick={() => {
                            auth.clearJWT(() => history.push('/'))
                        }}>
                            Sign Out
                        </Button>
                    </>
                )}
                {!auth.isAuthenticated() && (
                    <>
                        <Link to='/signup'>
                            <Button style={isActive(history, '/signup')}>
                                Sign Up
                            </Button>
                        </Link>
                        <Link to='/signin'>
                            <Button style={isActive(history, '/signin')}>
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
})

export default Menu
