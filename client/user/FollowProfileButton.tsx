import React from 'react'
import {follow, unfollow} from '../api/user'
import { Button } from '@material-ui/core';

const FollowProfileButton = ({following, onButtonClick}) => {
    
    const handleFollowUnfollow = () => {
        onButtonClick(following ? follow : unfollow)
    }

    return (
        <div>
            {following
                ? (<Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollowUnfollow}
                    >
                        Follow
                    </Button>)
                : (<Button
                    variant="contained"
                    color="primary"
                    onClick={handleFollowUnfollow}
                    >
                        Unfollow
                    </Button>)
            }
        </div>
    )
};

export default FollowProfileButton
