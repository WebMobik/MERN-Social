
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { comment, uncomment } from '../api/post'
import auth from './../auth/auth-helper'
import {
  CardHeader,
  TextField,
  Avatar,
  Icon,
  Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../styles/stylesForm'
import { ObjectId } from 'mongoose'
import { PostT } from '../user/types'

type CommentsProps = {
    postId: ObjectId,
    comments: PostT['comments'],
    updateComments: (comments: PostT['comments']) => void
}

const Comments: React.FC<CommentsProps> = ({postId, comments, updateComments}) => {
  const styles = useStyles()
  const [text, setText] = useState('')
  const jwt = auth.isAuthenticated()

  const handleChange = event => {
    setText(event.target.value)
  }

  const addComment = (event) => {
    if((event.keyCode == 13 || event.type == 'click') && text){
      event.preventDefault()
      comment({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, postId, {text: text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setText('')
          updateComments(data.comments)
        }
      })
    }
  }

  const deleteComment = comment => event => {
    uncomment({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        updateComments(data.comments)
      }
    })
  }

  const commentBody = item => {
    return (
      <p className={styles.commentText}>
        <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
        {item.text}
        <span className={styles.commentDate}>
          {(new Date(item.created)).toDateString()} |
          {jwt.user._id === item.postedBy._id &&
            <Icon onClick={deleteComment(item)} className={styles.commentDelete}>
              <DeleteIcon />
            </Icon> }
        </span>
      </p>
    )
  }

  return (
      <div>
        <CardHeader
          avatar={
            <Avatar className={styles.smallAvatar} src={'/api/users/photo/'+jwt.user._id}/>
          }
          title={
            <div className={styles.comment}>
              <TextField
                onKeyDown={addComment}
                variant="outlined"
                fullWidth
                multiline
                value={text}
                onChange={handleChange}
                placeholder="Write something ..."
                className={styles.commentField}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.commentBtn}
                onClick={addComment}
              >
                Submit
              </Button>
            </div>
          }
          className={styles.cardHeader}
        />
        
        {comments.map((item, i) => (
          <CardHeader
            avatar={
              <Avatar className={styles.smallAvatar} src={'/api/users/photo/'+item.postedBy._id}/>
            }
            title={commentBody(item)}
            className={styles.cardHeader}
            key={i}
          />
        ))}
    </div>
  )
}

export default Comments
