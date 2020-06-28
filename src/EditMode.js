import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import NewEditMode from './NewEditMode.js'
import AdminEventDialog from './AdminEventDialog.js'
import AdminTypeReason from './AdminTypeReason.js'

import AdminStations from './AdminStations.js'
import AdminObservationsChoise from './AdminObservationsChoise.js'


const useStyles = makeStyles(theme => ({
  textfield:{
    width: '80%', 
    margin: '0 10%',

  },

  card: {
    width: '40%',
    margin: '40vh 30%'
  },

}
));

export default function EditMode(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({
      'choise': null,
      });
  const setNewEventChoise=()=>{
    setState({ ...state, choise: 'newEvent' });
  }
  const setOldEventChoise=()=>{
    setState({ ...state, choise: 'oldEvent' });
  }
  const setEventTypeReasonChoise=()=>{
    setState({ ...state, choise: 'eventTypeReason' });
  }
  const setObservationsChoise =()=>{
    setState({ ...state, choise: 'observation' });
  }
  const setStationsChoise=()=>{
    setState({ ...state, choise: 'station' });
  }
  const setHydroObsChoise=()=>{
    setState({ ...state, choise: 'hydroObs' });
  }
  const setMeteoObsChoise=()=>{
    setState({ ...state, choise: 'meteoObs' });
  }
  const setAddPlaceChoise=()=>{
    setState({ ...state, choise: 'addPlace' });
  }
  const setNullChoise=()=>{
    setState({ ...state, choise: null });
  }
  const setPlaceForEvent=(placeName, placeId)=>{
    setState({ ...state, placeName: placeName,
                         placeId: placeId,
                         choise: 'newEvent'});    
  }
  const setPlaceForOldEvent=(placeName, placeId)=>{
    console.log(placeId)
    setState({ ...state, placeName: placeName,
                         placeId: placeId,
                         });    
  }
  const setIdForOldEvent=(eventName, eventId)=>{
    setState({ ...state,  eventName:eventName,
                          eventId:eventId,
                          choise: 'oldEvent'});
  }
  const returnChoiseCard=()=>{
    if (state.choise==null){
    return <Card className={classes.card}>
      <CardContent>
          <Typography  color="inherit" align='center' gutterBottom>
            
            <br/>Выберите редактируемую таблицу
          </Typography>
        </CardContent>
    <CardActions style={{justifyContent: 'center'}}>
        <AdminEventDialog login={props.login} password={props.password}
                          placeId={state.placeId}
                          setNewEventChoise={()=>setNewEventChoise()} setOldEventChoise={()=>setOldEventChoise()}
                          setPlaceForEvent={(placeName, placeId)=>setPlaceForEvent(placeName, placeId)} setPlaceForOldEvent={(placeName, placeId)=>setPlaceForOldEvent(placeName, placeId)}
                          setIdForOldEvent={(eventName, eventId)=>setIdForOldEvent(eventName, eventId)}/>
        <Button size="small" color="secondary" variant="outlined" onClick={()=>setEventTypeReasonChoise()}>Типы/причины событий</Button>
        <Button size="small" color="secondary" variant="outlined" onClick={()=>setStationsChoise()}>Станции наблюдения</Button>
        <Button size="small" color="secondary" variant="outlined" onClick={()=>setObservationsChoise()}>Наблюдения</Button>        
      </CardActions>
    <CardActions style={{justifyContent: 'center'}}>
    <Button size="small" color="primary" variant="outlined" href="https://github.com/eduard-kazakov/RDE">Руководство администратора</Button>
    </CardActions>
    
    </Card>
  }
  if (state.choise=='newEvent'){
    return <NewEditMode login={props.login} password={props.password} placeName={state.placeName} placeId={state.placeId} setNullChoise={()=>setNullChoise()} mode='new'/>
  }
  if (state.choise=='oldEvent'){
    return <NewEditMode login={props.login} password={props.password} placeName={state.placeName} placeId={state.placeId} eventName={state.eventName} eventId={state.eventId} setNullChoise={()=>setNullChoise()} mode='old'/>
  }
  if (state.choise=='eventTypeReason'){
    return <AdminTypeReason login={props.login} password={props.password} setNullChoise={()=>setNullChoise()}/>
  }

  if (state.choise=='station'){

    return <AdminStations login={props.login} password={props.password} setNullChoise={()=>setNullChoise()}/>
  }

  if (state.choise=='observation'){
    return <AdminObservationsChoise login={props.login} password={props.password} setNullChoise={()=>setNullChoise()}/>
  }

}
  
  return (
    <div>
    {returnChoiseCard()}

    </div>
  );
}


