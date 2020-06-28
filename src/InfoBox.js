import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  

  title: {
    fontSize: 14,

  },
  box:{
    
    color: '#131E16',
  }
});

export default function InfoBox() {
  const classes = useStyles();
  
  return (
    
    <Card className={classes.box}>
      <CardContent>

        <Typography variant="h5" component="h2" style={{fontSize: '2.5vh'}}>
          Информационный блок
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          Информация об организаторах 
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          Информация о проекте 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="#outlined-buttons">{<span style={{fontSize: '1.5vh'}}>Подробнее</span>}</Button>
      </CardActions>
    </Card>
    
  );
}