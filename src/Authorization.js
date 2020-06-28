import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: '#1D8A6B',
    color: '#ffffff',
    height: '10vh'
   
  },
  textfield:{
    width: '80%', 
    margin: '0 10%',

  },

  card: {
    width: '28%',
    margin: '30vh 36%'
  },
});

export default function Authorization(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
      loginValue: null,
      passwordValue: null,
      showPassword: false,
      });
  const setLogin=(event)=>{
      setState({ ...state, 'loginValue': event.target.value });
  }
  const setPassword=(event)=>{
      setState({ ...state, 'passwordValue': event.target.value });
  }
  const returnErrorBox=()=>{
    if (props.accessDenied==true){
      return <Typography  color="secondary" align='center' gutterBottom>Неверное имя пользователя или пароль</Typography>
    }
  }
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Card elevation={7} className={classes.card}>
      <CardContent>
        {returnErrorBox()}
        <Typography  color="inherit" align='center' gutterBottom>
          Авторизация
        </Typography>



      <form noValidate autoComplete="off" >
            <TextField className={classes.textfield} id="login" label="Login" value={state.loginValue} onChange={(event)=>setLogin(event)} autoFocus/>



        <FormControl className={classes.textfield}>
          <InputLabel>Password</InputLabel>
          <Input
            id="password"
            type={state.showPassword ? 'text' : 'password'}
            value={state.passwordValue}
            onChange={(event)=>setPassword(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>


      <CardActions style={{justifyContent: 'center'}}>
        <Button  size="small" color="secondary" variant="outlined" onClick={()=>props.getAccessData(state.loginValue, state.passwordValue)}>Войти</Button>
      </CardActions>

      </form>



      </CardContent>

    </Card>
  );
}