import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import { Person, ArrowForward } from '@material-ui/icons';
import useStyles from '../styles/stylesForm';
import { Follow } from '../user/types';

type UsersListProps = {
    title?: string
    users: Follow[]
}

const UsersList: React.FC<UsersListProps> = ({title = '', users}) => {
    const styles = useStyles()
    return (
        <Card>
            <CardContent>
                {title && (
                    <Typography variant="h6" className={styles.titleText}>
                        {title}
                    </Typography>
                )}
                <List dense>
                {users.map((user, i) => (
                    <Link to={'/user/' + user._id} key={i}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar src={'/api/users/photo/'+user._id} className={styles.bigAvatar}/>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} />
                        <ListItemSecondaryAction>
                        <IconButton>
                            <ArrowForward />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    </Link>
                ))}
                </List>
            </CardContent>
        </Card>
    )
};

export default UsersList
