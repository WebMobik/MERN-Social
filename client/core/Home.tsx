import React from 'react'
import auth from '../auth/auth-helper'
import Newsfeed from '../post/Newsfeed'
import FindPeople from '../user/FindPeople'
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@material-ui/core'
import useStyles from '../styles/stylesForm'

const Home: React.FC = () => {
    const styles = useStyles()
    const isAuth = auth.isAuthenticated()

    return (
        <div className={styles.root}>
            {isAuth ? (
                    <>
                        <Grid>
                            <Grid item xs={8} sm={7}>
                                <Newsfeed/>
                            </Grid>
                            <Grid item xs={6} sm={5}>
                                <FindPeople/>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                            <Card className={styles.card}>
                                <Typography variant="h4" className={styles.titleText}>
                                    Home Page
                                </Typography>
                                <CardContent>
                                    <Typography variant="h6" component="p">
                                        Welcome to the MERN Social home page. 
                                    </Typography>
                                </CardContent>
                            </Card>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </div>
    )
}

export default Home
