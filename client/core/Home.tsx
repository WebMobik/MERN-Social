import { Card, CardContent, CircularProgress, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { PostSchemaDoc } from '../../server/types'
import auth from '../auth/auth-helper'
import NewPost from '../post/NewPost'
import { listNewsFeed } from '../post/post-api'
import PostList from '../post/PostList'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        paddingTop: theme.spacing(2),
        textAlign: 'center'
    },
    loader: {
        margin: '0 auto'
    }
}))

const Home: React.FC = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const styles = useStyles()
    const [posts, setPosts] = useState<PostSchemaDoc[]>([])

    useEffect(() => {
        const isAuth = auth.isAuthenticated()
        if (isAuth) {
            setLoading(true)
            const abortController = new AbortController()
            listNewsFeed({
                userId: isAuth.user._id
            }, { 
                t: isAuth.token
            }, abortController.signal)
                .then(data => {
                    if (data.error) {
                        setError(true)
                        setLoading(false)
                    } else {
                        setPosts(data)
                        setLoading(false)
                    }
                })
        }
    }, [])

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
            </Alert>
        )
    }

    return (
        <Card className={styles.card}>
                <Typography className={styles.title}>
                    Home Page
                </Typography>
        {loading ? (
            <CircularProgress className={styles.loader} />
        ) : (
            <>
                <NewPost />
                <Divider />
                <PostList posts={posts} />
            </>
        )}
        </Card>
    )
}

export default Home
