import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Icon,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core';
import auth from '../auth/auth-helper';
import { create } from '../api/post';
import { PhotoCamera } from '@material-ui/icons';
import useStyles from '../styles/stylesForm';
import { PostSchemaDoc } from '../../server/types';

type PostValues = {
    text: string,
    photo: string,
    error: string,
    user: {
        _id?: string,
        name?: string
    }
}

type NewPostProps = {
    addUpdate: (post: PostSchemaDoc) => void
}

const NewPost: React.FC<NewPostProps> = ({ addUpdate }) => {
    const styles = useStyles()
    const [photoUrl, setPhotoUrl] = useState('')
    const [values, setValues] = useState<PostValues>({
        text: '',
        photo: '',
        error: '',
        user: {}
    })
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const isAuth = auth.isAuthenticated()
        setValues({
            ...values,
            user: isAuth.user
        })
        const photoURL = values.user?._id ? '/api/users/photo/' + values.user._id : '/api/users/defaultphoto'
        setPhotoUrl(photoURL)
    }, [])

    const onSubmitPost = () => {
        const postData = new FormData()
        postData.append('text', values.text)
        postData.append('photo', values.photo)

        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, postData)
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, text:'', photo: ''})
                }
            })
    }

    const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({...values, [name]: value })
    }

    return (
        <div className={styles.root}>
            <Card className={styles.card} variant="outlined">
                <CardHeader
                    avatar={<Avatar src={photoUrl}/>}
                    title={values.user?.name || ''}
                    className={styles.cardHeader}
                />
                <CardContent className={styles.cardContent}>
                    <TextField
                        placeholder="Share your thoughts ..."
                        multiline
                        rows="3"
                        value={values.text}
                        onChange={handleChange('text')}
                        className={styles.textField}
                        margin="normal"
                    />
                    <CardActions className={styles.actionSubmit}>
                        <input
                            accept="image/*"
                            onChange={handleChange('photo')}
                            className={styles.inputPhoto}
                            id="icon-button-file"
                            type="file"
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton color="secondary" className={styles.photoButton} component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <span className={styles.filename}>
                            {values.photo ? values.photo['name'] : ''}
                        </span>
                        { values.error && (
                            <Typography component="p" color="error">
                                <Icon color="error">error</Icon>
                                {values.error}
                            </Typography>
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={values.text === ''}
                            onClick={onSubmitPost}
                            className={styles.submit}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    )
};

export default NewPost