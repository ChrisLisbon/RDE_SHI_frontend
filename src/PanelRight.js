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
import EventTabsPhotoVideo from './EventTabsPhotoVideo'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

  },


  menuButton: {
     margin: '0 ',
     position: 'relative',
     zIndex: 10, 
     background: 'rgba(29, 138, 107, 0.5)',


  },
  menuButton1: {
      background: 'rgba(29, 138, 107, 0.5)',
      margin: '0',  },
  hide: {
    display: 'none',
  },

  drawerPaper: {
    width: '27%',
    height: '90vh', 
    margin: '10vh 0 0 75%',
    background: 'transparent',
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    float:'left',
    width: '5%'
  },


}));

export default function PanelRight(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const eventData=props.eventData
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div classname='rightPanel'>
      

        <Tooltip placement="top" title="Показать измерения">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ArrowDropUpIcon />
          </IconButton>
        </Tooltip>
        
      
      <Drawer
        
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        <Tooltip placement="top" title="Скрыть">
          <IconButton onClick={handleDrawerClose} className={classes.menuButton1}>
            {theme.direction === 'ltr' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          </Tooltip>
        </div>
        <EventTabsPhotoVideo eventData={eventData}/>
      </Drawer>
      
          </div>
  );
}