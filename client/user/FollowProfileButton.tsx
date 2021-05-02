import React from 'react'
import {follow, unfollow} from '../api/user'
import { Button } from '@material-ui/core';

const FollowProfileButton = ({following, onButtonClick}) => {
    
    const handleFollowUnFollow = () => {
        onButtonClick(following ? unfollow : follow)
    }

    return (
        <div>
            {following
                ? (<Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollowUnFollow}
                    >
                        Unfollow
                    </Button>)
                : (<Button
                    variant="contained"
                    color="primary"
                    onClick={handleFollowUnFollow}
                    >
                        Follow
                    </Button>)
            }
        </div>
    )
};

export default FollowProfileButton
