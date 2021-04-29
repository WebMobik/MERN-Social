import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Icon, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import auth from '../auth/auth-helper';
import { create } from './post-api';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#efefef',
        padding: `${theme.spacing(3)}px 0px 1px`
    },
    card: {
        maxWidth:600,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(65, 150, 136, 0.09)',
        boxShadow: 'none'
    },
    cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0
    },
    cardHeader: {
        paddingTop: 8,
        paddingBottom: 8
    },
    photoButton: {
        height: 30,
        marginBottom: 5
    },
    input: {
        play: 'none',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
    },
    submit: {
        margin: theme.spacing(2)
    },
    filename:{
        verticalAlign: 'super'
    }
}))

type PostValues = {
    text: string,
    photo: string,
    error: string,
    user: {
        _id?: string,
        name?: string
    }
}

const NewPost: React.FC = () => { // { addUpdate }
    const classes = useStyles()
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

    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({...values, [name]: value })
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={photoUrl}/>
                }
                title={values.user?.name || ''}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <TextField
                    placeholder="Share your thoughts ..."
                    multiline
                    rows="3"
                    value={values.text}
                    onChange={handleChange('text')}
                    className={classes.textField}
                    margin="normal"
                />
                <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <IconButton color="secondary" className={classes.photoButton} component="span">
                    <PhotoCamera />
                </IconButton>
                </label> <span className={classes.filename}>{values.photo ? values.photo['name'] : ''}</span>
                { values.error && (<Typography component="p" color="error">
                    <Icon color="error">error</Icon>
                    {values.error}
                    </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" disabled={values.text === ''} onClick={onSubmitPost} className={classes.submit}>POST</Button>
            </CardActions>
            </Card>
        </div>
    )
};

export default NewPost