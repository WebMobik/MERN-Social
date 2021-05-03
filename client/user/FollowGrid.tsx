import React from 'react'
import useStyles from '../styles/stylesForm';
import UsersList from '../components/UsersList';
import { Follow } from './types';

type FollowGridProps = {users: Follow[]}

const FollowGrid: React.FC<FollowGridProps> = ({users = []}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
     <UsersList users={users} />
    </div>
  )
};

export default FollowGrid
