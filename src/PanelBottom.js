import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DiagramCard from './DiagramCard.js'
import Tooltip from '@material-ui/core/Tooltip';



const useStyles =  makeStyles(theme => ({
  root: {
    display: 'flex',

  },


  menuButton: {
     margin: '87vh 0 0 23vW',
     position: 'relative',
     zIndex: 10, 
     background: 'rgba(29, 138, 107, 0.5)',
     height: '5.58vh',
     width:'5.58vh',
     minHeight:0,
     minWidth:0,
     padding: 0,

  },
  menuButton2: {
     margin: '87vh 0 0 11vW',
     position: 'relative',
     zIndex: 10, 
     background: 'rgba(29, 138, 107, 0.5)',
     height: '5.58vh',
     width:'5.58vh',
     minHeight:0,
     minWidth:0,
     padding: 0,

  },
  menuButton1: {
      background: 'rgba(29, 138, 107, 0.5)',
      height: '5.58vh',
      width:'5.58vh',
      minHeight:0,
      minWidth:0,
      padding: 0,

  },
  hide: {
    display: 'none',
  },

  drawerPaper: {
    width: '50%',
    height: '52.08vh', 
    margin: '0 25% 0 25%',
    background: 'transparent',
    overflow: 'hidden',
    border: 0
  },
    drawerPaper1: {
    width: '25%',
    height: '52.08vh', 
    margin: '0 25% 0 25%',
    background: 'transparent',
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5.58vh', 
  },


}));

export default function PanelBottom(props) {
  const classes = useStyles();
  const theme = useTheme();
  const panelOpen = props.panelOpen

  const [state, setState] = React.useState({
    
    fullWidthW: false,
    flag:false
  });



  
 const paperWidth = (fullWidthOpen) => {
    if (fullWidthOpen==true){
      return classes.drawerPaper
    }
    if (fullWidthOpen==false){
      return classes.drawerPaper1
    }

 }
 const buttonMargin = (fullWidthOpen)=>{
  if (fullWidthOpen==true){
      return classes.menuButton
    }
    if (fullWidthOpen==false){
      return classes.menuButton2
    }
 }
  const setDrawerWidth = () => event=>{
    
    setState({...state,fullWidthW: true, flag:true});
  };

  return (
    <div >
      

        <Tooltip placement="top" title="Показать">
          <IconButton
            color="inherit"
            onClick={()=>props.handleDrawerOpen()}
            edge="start"
            className={clsx(buttonMargin(state.fullWidthW), panelOpen && classes.hide)}
          >
            <ArrowDropUpIcon />
          </IconButton>
        </Tooltip>
        
      
      <Drawer
        
        variant="persistent"
        anchor="bottom"
        open={panelOpen}
        classes={{
          paper: paperWidth(state.fullWidthW),
        }}
      >
        <div className={classes.drawerHeader}>
        <Tooltip placement="top" title="Скрыть">
          <IconButton onClick={()=>props.handleDrawerClose()} className={classes.menuButton1}>
            {theme.direction === 'ltr' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          </Tooltip>
        </div>
        <DiagramCard eventData={props.eventData} clickedStationId={props.clickedStationId}
        clickedStationType={props.clickedStationType} setDrawerWidth={setDrawerWidth()} flag={state.flag}/>
      </Drawer>
      
          </div>
  );
}