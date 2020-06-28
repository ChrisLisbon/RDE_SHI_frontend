import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventMediaCards from './EventMediaCards.js'
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ZeroPadding from './ZeroPadding';
import EventTabsPhotoVideo from './EventTabsPhotoVideo.js'


const useStyles = makeStyles({
  
dialogPaper: {
        minWidth: '30vw',
        maxWidth: '30vw',
        margin:0,
        padding:0
    },

});

export default function EventMediaDialog(props) {
  const classes = useStyles();
  const open=props.open;


  const type=props.type
  return (

    
       
      <Dialog classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={()=>props.dialogClose()}
        
        scroll = 'body'
      >
        <ThemeProvider theme={ZeroPadding}>
        <DialogContent style={{width: "100%", margin: 0}}>
          <EventTabsPhotoVideo eventData = {props.eventData}/>
        </DialogContent>
        </ThemeProvider>
        <DialogActions style={{height: '3vh'}}>
          <Button  onClick={()=>props.dialogClose()} color="primary" autoFocus>
            {<span style={{ fontSize: '1.5vh' }}>Закрыть</span>}
          </Button>
        </DialogActions>

      </Dialog>

    
  );
}