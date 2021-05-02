import React from 'react'
import { ObjectId } from 'mongoose';
import { PostT } from '../user/types';

type CommentsProps = {
    postId: ObjectId,
    comments: PostT['comments'],
    updateComments: (comments: PostT['comments']) => void
}

const Comments: React.FC<CommentsProps> = () => {
    return (
        <div>

        </div>
    )
};

export default Comments
