import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        paddingTop: theme.spacing(2),
        textAlign: 'center'
    }
}))

const Home: React.FC = () => {
    const styles = useStyles()

    return (
        <Card className={styles.card}>
            <Typography className={styles.title}>
                Home Page
            </Typography>
            
        </Card>
    )
}

export default Home
