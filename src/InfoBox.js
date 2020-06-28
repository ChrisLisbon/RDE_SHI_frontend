import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {font_size} from './system_functions.js'

const useStyles = makeStyles({
  box:{    
    color: '#131E16',
    overflow: 'auto'
  }
});

export default function InfoBox() {
  const classes = useStyles();
  const vh = window.innerHeight;
  
  return (
    
    <Card className={classes.box}>
      <CardContent >

        <Typography variant="h5" component="h2" style={{fontSize: font_size(vh, 2.3)}}>
          Информационный блок
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          Информация об организаторах 
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          Информация о проекте 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="#outlined-buttons">{<span style={{fontSize: font_size(vh, 1.5)}}>Подробнее</span>}</Button>
      </CardActions>
    </Card>
    
  );
}