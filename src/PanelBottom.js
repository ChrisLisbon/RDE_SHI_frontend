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
     marginLeft: '23vW',
     marginBottom:0,
     marginRight:0,
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
     marginLeft: '11vW',
     marginBottom:0,
     marginRight:0,
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
    margin: '0 25% 0 25%',
    background: 'transparent',
    overflow: 'hidden',
    border: 0
  },
    drawerPaper1: {
    width: '25%',
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
  const vh = window.innerHeight;

  const [state, setState] = React.useState({    
    fullWidthW: false,
    flag:false
  });


  const buttonMarginTopStyle=(vh)=>{
    if (vh>=920){
      const mg=87
      return {marginTop: String(mg)+'px'}
    }
    if (vh<920){
      const button_vh=vh*0.01*5.58
      const mg=vh - 64.4 - button_vh
      return {marginTop: String(mg)+'px'}
    }
  }
  
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
            style={buttonMarginTopStyle(vh)}
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