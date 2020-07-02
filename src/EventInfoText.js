import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {font_size} from './system_functions.js'

export default function EventInfoText(props) {
	const name=props.name;
	const dataStart=props.dataStart;
	const dataEnd=props.dataEnd;
	const description=props.description;
  const area=props.area;
  const cost=props.cost;
  const maxDepth=props.maxDepth;
  const meanDepth=props.meanDepth;
  const maxSpeed=props.maxSpeed;
  const meanSpeed=props.meanSpeed;
  const reason=props.reason;
  const margin=props.margin;
  
  const vh = window.innerHeight

return (
<Paper style={{height:'auto',  margin:{margin}, overflow: 'auto', background:'transparent'}}>
      
          <CardContent style={{background: 'rgba(29, 138, 107, 0.8)', height: font_size(vh, 5.58), padding: '0 0'}}>
          <Typography variant="body1" component="p" align='center' style={{padding: font_size(vh, 0.5), fontSize: font_size(vh, 1.8)*0.8}}>
            <b>Событие: {name}</b>
          </Typography>
        </CardContent>
        <CardContent  style={{background: 'rgba(255, 255, 255, 0.8)', overflow: 'auto', height: '38.92vh', padding: '2vh 2vh 0 2vh'}}>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Начало события:</i></b> {dataStart}
          <br/>
          <b><i>Окончание события:</i></b> {dataEnd}
        </Typography>

         <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Описание события:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {description}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Затронутая площадь:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {area}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Ущерб в рублях:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {cost}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Максимальная глубина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {maxDepth}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Средняя глубина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {meanDepth}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Максимальная скорость:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {maxSpeed}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Средняя скорость:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {meanSpeed}
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          <b><i>Причина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: font_size(vh, 1.5)}}>
          {reason}
        </Typography>

      </CardContent>

    </Paper>
)
}