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
    display: 'none'
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
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // follow
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  },
  follow: {
    display: 'flex',
    alignItems: 'center'
  },
  // comments
  smallAvatar: {
    width: 25,
    height: 25
  },
  comment: {
    display: 'flex',
    alignItems: 'center'
  },
  commentBtn: {
    marginLeft: '10px',
    height: '45px'
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
}))

export default useStyles
