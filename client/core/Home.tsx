import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import auth from '../auth/auth-helper'
import useStyles from '../styles/stylesForm'
import Newsfeed from '../post/Newsfeed'

const Home: React.FC = () => {
    const styles = useStyles()
    const isAuth = auth.isAuthenticated()

    return (
        <Card className={styles.card}>
        {isAuth ? (
                <>
                   <Grid container spacing={8}>
                        <Grid item xs={8} sm={7}>
                        <Newsfeed/>
                        </Grid>
                        <Grid item xs={6} sm={5}>
                        {/* <FindPeople/> */}
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Typography variant="h4" className={styles.titleText}>
                        Home page
                    </Typography>
                    <Typography variant="h5" className={styles.titleText}>
                        Authorizate if you want watch all
                    </Typography>
                </>
            )
        }
        </Card>
    )
}

export default Home
