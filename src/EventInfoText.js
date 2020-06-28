import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
  


return (
<Paper style={{height:'46.5vh',  margin:{margin}, overflow: 'auto', background:'transparent'}}>
      
          <CardContent style={{background: 'rgba(29, 138, 107, 0.8)', height: '5.58vh', padding: '0 0'}}>
          <Typography variant="body1" component="p" align='center' style={{padding: '1vh', fontSize: '1.8vh'}}>
            <b>Событие: {name}</b>
          </Typography>
        </CardContent>
        <CardContent  style={{background: 'rgba(255, 255, 255, 0.8)', overflow: 'auto', height: '38.92vh', padding: '2vh 2vh 0 2vh'}}>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Начало события:</i></b> {dataStart}
          <br/>
          <b><i>Окончание события:</i></b> {dataEnd}
        </Typography>

         <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Описание события:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {description}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Затронутая площадь:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {area}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Ущерб в рублях:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {cost}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Максимальная глубина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {maxDepth}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Средняя глубина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {meanDepth}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Максимальная скорость:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {maxSpeed}
        </Typography>

        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Средняя скорость:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {meanSpeed}
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          <b><i>Причина:</i></b>
        </Typography>
        <Typography variant="body2" component="p" style={{fontSize: '1.5vh'}}>
          {reason}
        </Typography>

      </CardContent>

    </Paper>
)
}