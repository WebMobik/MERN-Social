import { CircularProgress } from '@material-ui/core';
import React from 'react'
import useStyles from '../styles/stylesForm';

const Loader = () => {
    const styles = useStyles()
    return (
        <div className={styles.loader}>
            <CircularProgress />
        </div>
    )
};

export default Loader
