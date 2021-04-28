import React from 'react'
import { PostSchemaDoc } from '../../server/types';

type CommentsProps = {
    postId: string,
    comments: PostSchemaDoc['comments'],
    updateComments: (comments: PostSchemaDoc['comments']) => void
}

const Comments: React.FC<CommentsProps> = () => {
    return (
        <div>

        </div>
    )
};

export default Comments
