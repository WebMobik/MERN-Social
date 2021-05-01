import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  titleText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnSuccess: {
    color: '#ffffff',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}))

export default useStyles
