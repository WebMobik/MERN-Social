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
    marginLeft: 'auto',
  },
  titleText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnSuccess: {
    color: '#ffffff',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  actionSubmit: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  root: {
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    padding: '12px 32px 5px'
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  inputPhoto: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: '10px',
    backgroundColor: 'whitesmoke',
    width: '90%'
  },
  filename:{
    verticalAlign: 'super'
  },
  loader: {
    margin: '0 auto'
  }
}))

export default useStyles
