import React from 'react'
import { Grid } from '@material-ui/core';
import Post from './Post';
import { PostSchemaDoc } from '../../server/types';

type PostListProps = {
    posts: PostSchemaDoc[],
    removeUpdate: (post: PostSchemaDoc) => void
}

const PostList: React.FC<PostListProps> = ({ posts, removeUpdate }) => {
    return (
        <Grid container spacing={4}>
            {posts.map((post: PostSchemaDoc, index: number) => (
                <Post key={index} post={post} onRemove={() => ({})} />
            ))}
        </Grid>
    )
};

export default PostList