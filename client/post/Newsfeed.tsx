import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import { listNewsFeed } from './post-api';
import auth from '../auth/auth-helper';
import PostList from './PostList';

const Newsfeed: React.FC = () => {
    const [posts, setPosts] = useState()
    const sessionAuth = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        listNewsFeed(
            sessionAuth.id,
            sessionAuth.token,
            abortController.signal
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
    })

    return (
        <Container>
            <PostList posts={posts} />
        </Container>
    )
};

export default Newsfeed
