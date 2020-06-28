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
    background: '#ffffff',
    color: '#131E16',
    margin: 5
  }
});

export default function EventDocumentCards(props) {
  const classes = useStyles();
    
    return (
    <Card className={classes.box}>
      <CardContent>

        <Typography variant="body1" style={{fontSize: '1.8vh'}} component="p">
          <b>{props.newsHeader}</b>
        </Typography>
        <Typography style={{fontSize: '1.8vh'}} component="p">
          {props.newsBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{fontSize: '1.4vh'}} href={props.newsLink} target="_blank">Читать в источнике</Button>
      </CardActions>
    </Card>

  );
}  

