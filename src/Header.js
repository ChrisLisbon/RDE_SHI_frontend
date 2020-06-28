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
import {font_size} from './system_functions.js' 

export default function Header(props) {
  const vh = window.innerHeight;
  

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
                      <span style={{ fontSize: font_size(vh, 1.5) }}>Скачать данные</span>
             </Button>
    }
  }

  return (
    <div>
      <AppBar position="static" style={{flexGrow: 1, background: '#1D8A6B', color: '#ffffff', height: font_size(vh, 7), padding: 0}} >
        <Toolbar style={{height:font_size(vh, 7), minHeight:0}}>

        <ButtonBase onClick={()=>mainWindowOpen()}>
        <img src={require("./shi_round.png")} alt="logo"  style={{height: font_size(vh, 6), width: font_size(vh, 6), margin: font_size(vh, 0.5)+' 0'}}/>
        </ButtonBase>

          <div style={{flexGrow: 1}}>
          <Typography  style={{flexGrow: 1, fontSize: font_size(vh, 2.5), margin: '0 1vw '}} >
            Опасные гидрологические явления
          </Typography>
          <Typography  style={{fontSize: font_size(vh, 1.7), flexGrow: 1, margin: '0 1.5vw ', padding: 0}}>
            Государственный Гидрологический Институт
          </Typography>
          </div>
          <Button color="inherit" href='#'>
                    <span style={{ fontSize: font_size(vh, 1.5) }}>Руководство пользователя</span>
          </Button>
          {returnGetDataButton(props.event_id)}
          <Button color="inherit" onClick={()=>adminWindowOpen()}>
                    <span style={{ fontSize: font_size(vh, 1.5) }}>Административная панель</span>
          </Button>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}