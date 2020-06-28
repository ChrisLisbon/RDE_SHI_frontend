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
    background: '#ffffff',
    color: '#131E16',
    margin: 5
  }
});

export default function EventDocumentCards(props) {
  const classes = useStyles();
  const vh = window.innerHeight
    return (
    <Card className={classes.box}>
      <CardContent>

        <Typography variant="body1" style={{fontSize: font_size(vh, 1.8)}} component="p">
          <b>{props.newsHeader}</b>
        </Typography>
        <Typography style={{fontSize: font_size(vh, 1.8)}} component="p">
          {props.newsBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{fontSize: font_size(vh, 1.4)}} href={props.newsLink} target="_blank">Читать в источнике</Button>
      </CardActions>
    </Card>

  );
}  

