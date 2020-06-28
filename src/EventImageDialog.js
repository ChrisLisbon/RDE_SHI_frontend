import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventMediaCards from './EventMediaCards.js'
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ZeroPadding from './ZeroPadding';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function EventImageDialog(props) {
  const open=props.open;
  const eventData = props.eventData;
  const title=props.title
  const path='http://'+props.path
  const type=props.type
  const id=props.clickedImageId



  return (

    
       
      <Dialog
        open={open}
        onClose={()=>props.dialogClose()}
        maxWidth = 'lg'
        scroll = 'body'
      >
        <ThemeProvider theme={ZeroPadding}>
        <DialogContent>
          <Card >
                  <CardContent >

                    <CardMedia style={{width: '100%', height: '100%', }} 
                      
                      image={path}
                      component='img'
                      alt={title}
                      
                    />
                    <Typography variant="body2" component="p">
                      {title}
                    </Typography>
                    
                  </CardContent>
           </Card>


        </DialogContent>
        </ThemeProvider>
        <DialogActions>
          <Button onClick={()=>{props.dialogClose();console.log(path)}} color="primary" autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

    
  );
}