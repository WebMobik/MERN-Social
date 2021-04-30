import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import { like, remove, unlike } from './post-api';
import auth from '../auth/auth-helper';
import Comments from './Comments';
import { PostSchemaDoc, ErrorRes } from '../../server/types';

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

const Post: React.FC<{ post: PostSchemaDoc, onRemove: (post: PostSchemaDoc) => void }> = ({ post, onRemove }) => {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const checkLike = (likes) => likes.indexOf(jwt.user._id) !== -1
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
        ).then((data: PostSchemaDoc | ErrorRes) => {
            if ((data as ErrorRes).error) {
                console.log((data as ErrorRes).error)
            } else {
                setValues({...values, like: !values.like, likes: (data as PostSchemaDoc).likes.length})
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
        }).then((data: PostSchemaDoc | ErrorRes) => {
            if ((data as ErrorRes).error) {
                console.log((data as ErrorRes).error)
            } else {
                onRemove(post)
            }
        })
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={'/api/users/photo'+post.postedBy} />
                }
                action={
                    post.postedBy === auth.isAuthenticated().user._id && (
                        <IconButton onClick={deletePost}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                // title={<Link to={"/user/"+post.postedBy}>{post.postedBy.name}</Link>} // TODO: разобрать postedBy и вытащить имя пользователя создавшего пост
                subheader={(new Date(post.created).toDateString())}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <Typography component="p" className={classes.text}>
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
                <IconButton className={classes.button} aria-label="Comment" color="secondary">
                    <CommentIcon/>
                </IconButton> <span>{values.comments.length}</span>
            </CardActions>
            <Divider/>
            <Comments postId={post._id} comments={values.comments} updateComments={updateComments}/>
        </Card>
    )
};

export default Post