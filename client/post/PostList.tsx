import React from 'react'
import { Grid } from '@material-ui/core';
import Post from './Post';
import { PostT } from '../user/types';

type PostListProps = {
    posts: PostT[],
    removeUpdate: (post: PostT) => void
}

const PostList: React.FC<PostListProps> = ({ posts = [], removeUpdate }) => {
    return (
        <Grid container>
            {posts.map((post: PostT, index: number) => (
                <Post key={index} post={post} onRemove={removeUpdate} />
            ))}
        </Grid>
    )
};

export default PostList