import { Avatar, Card, CardHeader } from '@material-ui/core';
import { PostSchemaDoc } from '../../server/types';
import React from 'react'

const PostList: React.FC<{ post: PostSchemaDoc }> = ({ post }) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={'/api/users/photo'+post.postedBy._id} />
                }
            />
        </Card>
    )
};

export default PostList