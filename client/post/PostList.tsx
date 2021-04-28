import React from 'react'
import { Paper } from '@material-ui/core';
import Post from './Post';
import { PostSchemaDoc } from '../../server/types';

const PostList: React.FC<{ posts: PostSchemaDoc[] }> = ({ posts }) => {
    return (
        <Paper elevation={3}>
            {posts.map((post, index) => (
                <Post key={index} post={post} onRemove={() => ({})} />
            ))}
        </Paper>
    )
};

export default PostList