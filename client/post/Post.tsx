import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { like, remove, unlike } from '../api/post'
import Comments from './Comments'
import auth from '../auth/auth-helper'
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import { ObjectId } from 'mongoose'
import { PostT, StateComponentT } from '../user/types'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth:600,
      margin: 'auto',
      marginBottom: theme.spacing(3),
      backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },
    cardContent: {
      backgroundColor: 'white',
      padding: `${theme.spacing(2)}px 0px`
    },
    cardHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    text: {
      margin: theme.spacing(2)
    },
    photo: {
      textAlign: 'center',
      backgroundColor: '#f2f5f4',
      padding:theme.spacing(1)
    },
    media: {
      height: 200
    },
    button: {
     margin: theme.spacing(1),
    }
}))

type PostProps = {
    post: PostT
    onRemove: (post: PostT) => void
}

const Post: React.FC<PostProps> = ({ post, onRemove }) => {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const checkLike = (likes: ObjectId[]) => likes.indexOf(jwt.user._id) !== -1
    const [state, setState] = useState<StateComponentT>({
        open: false,
        loading: true,
        error: false
    })
    const [values, setValues] = useState({
        like: checkLike(post.likes),
        likes: post.likes.length,
        comments: post.comments
    })

    const clickLike = () => {
        const chooseApi = values.like ? unlike : like
        chooseApi(
            { userId: jwt.user._id },
            { t: jwt.token },
            post._id
        ).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({...values, like: !values.like, likes: (data as PostT).likes.length})
            }
        })
    }

    const updateComments = (comments) => {
        setValues({ ...values, comments })
    }

    const deletePost = () => {
        remove({
            postId: post._id
        }, {
            t: jwt.token
        }).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                onRemove(post)
            }
        })
    }

    const toggleShowComments = () => {
        setState(prev => ({...prev, open: !prev.open}))
    }

    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={'/api/users/photo/'+post.postedBy._id} />
                    }
                    action={
                        post.postedBy === auth.isAuthenticated().user._id && (
                            <IconButton onClick={deletePost}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={<Link to={"/user/"+post.postedBy}>{(post.postedBy as { name: string }).name}</Link>}
                    subheader={(new Date(post.created).toDateString())}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <Typography component="p" variant="subtitle1" paragraph className={classes.text}>
                        { post.text }
                    </Typography>
                    {post.photo && (
                        <div className={classes.photo}>
                            <img
                                className={classes.media}
                                src={'/api/posts/photo/'+post._id}
                            />
                        </div>
                    )}
                </CardContent>
                <CardActions>
                    {values.like ? (
                        <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                            <FavoriteIcon />
                        </IconButton>
                        ) : (
                        <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                    <span>{values.likes}</span>
                    <IconButton
                        className={classes.button}
                        aria-label="Comment"
                        color="secondary"
                        onClick={toggleShowComments}
                    >
                        <CommentIcon/>
                    </IconButton> <span>{values.comments.length}</span>
                </CardActions>
                <Divider/>
                {state.open && <Comments postId={post._id} comments={values.comments} updateComments={updateComments}/>}
            </Card>
        </Grid>
    )
};

export default Post