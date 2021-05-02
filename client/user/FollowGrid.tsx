import { Avatar, GridList, GridListTile, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import useStyles from '../styles/stylesForm';

const FollowGrid = ({people = []}) => {
    const classes = useStyles()
    return (<div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {people.map((person, index) => (
            <GridListTile style={{'height':120}} key={index}>
                <Link to={"/user/" + person._id}>
                    <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar}/>
                    <Typography className={classes.titleText}>{person.name}</Typography>
                </Link>
            </GridListTile>
        ))}
      </GridList>
    </div>)
};

export default FollowGrid
