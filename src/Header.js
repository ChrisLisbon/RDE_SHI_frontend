import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonBase from '@material-ui/core/ButtonBase';

import {frontend_settings} from './server_settings.js'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: '#1D8A6B',
    color: '#ffffff',
    height: '7vh',
    padding: 0
   
  },
  
  title: {
    flexGrow: 1,
    fontSize: '2.5vh',
    margin: '0 1vw '
  },
});

export default function Header(props) {
  const classes = useStyles();

  const adminWindowOpen=()=>{
    window.open('http://'+ frontend_settings.host+ ':'+frontend_settings.port+'/admin','_blank');
  }

  const downloadWindowOpen=()=>{
    window.open('http://'+ frontend_settings.host+ ':'+frontend_settings.port+'/download#'+props.event_id,'_blank');
  }

  const mainWindowOpen=()=>{
    window.open('http://'+ frontend_settings.host+ ':'+frontend_settings.port, "_self");
  }

  const returnGetDataButton=(event_id)=>{
    if(event_id!==undefined){
      return <Button color="inherit" onClick={()=>downloadWindowOpen()}>
                      <span style={{ fontSize: '1.5vh' }}>Скачать данные</span>
             </Button>
    }
  }

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar style={{height:'7vh', minHeight:0}}>

        <ButtonBase onClick={()=>mainWindowOpen()}>
        <img src={require("./shi_round.png")} alt="logo"  style={{height: '6vh', width: '6vh', margin: '0.5vh 0 '}}/>
        </ButtonBase>

          <div style={{flexGrow: 1}}>
          <Typography  className={classes.title}>
            Опасные гидрологические явления
          </Typography>
          <Typography  style={{fontSize: '1.5vh', flexGrow: 1, margin: '0 1.5vw ', padding: 0}}>
            Государственный Гидрологический Институт
          </Typography>
          </div>
          <Button color="inherit" href='#'>
                    <span style={{ fontSize: '1.5vh' }}>Руководство пользователя</span>
          </Button>
          {returnGetDataButton(props.event_id)}
          <Button color="inherit" onClick={()=>adminWindowOpen()}>
                    <span style={{ fontSize: '1.5vh' }}>Административная панель</span>
          </Button>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}