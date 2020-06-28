import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { KeyboardDateTimePicker } from "@material-ui/pickers";

import {postNewMeteoObservation, StationListGet} from './request_functions.js'
import {station_types_id} from './db_constants.js'

var moment = require('moment');
moment().format();


const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 2%',
    padding: '1%',
    height: '30vh',
    maxHeight: '30vh',
    overflow: 'auto',
    width: '100%',
  },
  textfield: {
    width: '100%'
    
  },


}
));


export default function AdminMeteooObs(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      observation_date:null,
      meteo_station_id:'',
      air_temperature:'',
      precipitations:'',
      firstDataGet:false,
      stationsList:null,
      serverPushResponse:null,
      setOpenDialog:false,
      });

if (state.firstDataGet==false){
	if (state.stationsList==null){				
					StationListGet(station_types_id.meteostation).then(data=>setState({ ...state, stationsList: data}))		
				}
	setState({ ...state, firstDataGet: true})
}

const resposneText=()=>{
	if (state.serverPushResponse!==null){
		if (state.serverPushResponse.status=='ok'){
			return 'Данные успешно загружены'
		}
		if (state.serverPushResponse.status!=='ok'){
			return 'Произошла ошибка '+state.serverPushResponse.comment
		}
	}
}

const returnStationAutoc=()=>{
	if (state.stationsList!=null){
		return <Autocomplete              
            
            noOptionsText='Нет совпадений'
            options={state.stationsList.data.stations}
            getOptionLabel={option => option.id.toString()}
            onChange={(event,value)=>setMeteoStationId(event,value)}
            renderInput={params => (
              <TextField {...params} label='Id станции' variant="standard" fullWidth />
            )}
          />
	}
}
	
 const dialogClose = () => {
    setState({ ...state, setOpenDialog: false });
  };




const setMeteoStationId=(event,value)=>{
	if (value!==null){
      setState({ ...state, meteo_station_id: value.id });
	}
  }

const setAirTemperature=(event)=>{
      setState({ ...state, air_temperature: event.target.value });
  }
const setPrecipitations=(event)=>{
      setState({ ...state, precipitations: event.target.value });
  }
const setObsDate = date => {
    setState({...state, observation_date: date});
  };
const addNewMeteoObs=(meteoObsJson)=>{
	if (
	 meteoObsJson.observation_date != null &&
	  meteoObsJson.meteo_station_id != '' &&
	   meteoObsJson.air_temperature != '' &&
	    meteoObsJson.precipitations != '' 
){
	const form =new FormData();
	form.append('observation_date', moment(meteoObsJson.observation_date).format("DDMMYYYYTHHmmss"))
	form.append('meteo_station_id', meteoObsJson.meteo_station_id)
	form.append('air_temperature', meteoObsJson.air_temperature)
	form.append('precipitations', meteoObsJson.precipitations)
    postNewMeteoObservation(form, props.login, props.password).then(data=>{console.log(data);setState({ ...state, serverPushResponse: data,											  		
    															          
																	  	  setOpenDialog:true,})})							
    														  
  }
}

const meteoObsJson = {
                'observation_date':state.observation_date,
                'meteo_station_id':state.meteo_station_id,
                'air_temperature':state.air_temperature,
                'precipitations': state.precipitations,

}

	
		  return (

				  
				    <div className={classes.root} >					    
					    	
				   		<MuiPickersUtilsProvider utils={DateFnsUtils} >
			              <div className={classes.textfield}>
			              <KeyboardDateTimePicker
					        autoOk
					        ampm={false}
					        disableFuture
					        value={state.observation_date}
					        onChange={setObsDate}
					        label="Дата и время наблюдения"
					        format="yyyy/MM/dd HH:mm"
					      />
					       </div>          
          				</MuiPickersUtilsProvider>

					    {returnStationAutoc()}

					    <TextField className={classes.textfield} value={state.air_temperature} id="air_temperature" label="Температура воздуха" type="number" onChange={(event)=>setAirTemperature(event)}/> 
					    <TextField className={classes.textfield} value={state.precipitations} id="precipitations" label="Осадки" type="number" onChange={(event)=>setPrecipitations(event)}/> 
				  		<div style={{height:"4vh"}}></div>
				  		<Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
					              onClick={()=>addNewMeteoObs(meteoObsJson)} 
					    >Добавить</Button> 
					    <Dialog
					        open={state.setOpenDialog}
					        onClose={()=>dialogClose()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            {resposneText()}
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          <Button onClick={()=>dialogClose()} color="primary" autoFocus>
					            Закрыть
					          </Button>
					        </DialogActions>
					        </Dialog>
				   
				   </div>
				    
  );
}
		
	


