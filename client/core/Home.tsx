import { Card, CardContent, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
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
    }
}))

const Home: React.FC = () => {
    const styles = useStyles()
    const jwt = auth.isAuthenticated()
    const [posts, setPosts] = useState<PostSchemaDoc[]>([])

    useEffect(() => {
        const isAuth = auth.isAuthenticated()
        if (isAuth) {
            const abortController = new AbortController()
            listNewsFeed({
                userId: isAuth.user._id
            }, { 
                t: isAuth.token
            }, abortController.signal)
                .then(data => {
                    if (data.error) {
                        console.log('Error !')
                    } else {
                        setPosts(data)
                    }
                })
        }
    }, [])

    return (
        <Card className={styles.card}>
            <Typography className={styles.title}>
                Home Page
            </Typography>
            <NewPost />
            <Divider />
            <PostList posts={posts} />
        </Card>
    )
}

export default Home
