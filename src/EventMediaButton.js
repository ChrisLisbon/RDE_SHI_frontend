import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {font_size} from './system_functions.js'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: '1vw',
    background: '#1D8A6B',
    borderRadius: 35,
    '&:hover': {
      backgroundColor: '#97C8B3',
      borderColor: '#97C8B3',
      
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    height: '2.5vh',
  },
}));

export default function EventMediaButton(props) {
  const classes = useStyles();
  const vh = window.innerHeight

  return (
    <div style={{float: 'right'}}>

      <Fab variant="extended" style={{height: font_size(vh, 6.8)}} className={classes.fab} onClick={()=>props.dialogOpen()}>
        <PhotoLibraryIcon style={{height: font_size(vh, 2.5)}} className={classes.extendedIcon} />        
        <span style={{ fontSize: font_size(vh, 1.5) }}>Медиафайлы</span>
      </Fab>

    </div>
  );
}


