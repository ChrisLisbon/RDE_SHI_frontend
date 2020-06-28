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
import Fab from '@material-ui/core/Fab';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { KeyboardDateTimePicker } from "@material-ui/pickers";

import {postNewHydroObservation, StationListGet} from './request_functions.js'
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
export default function AdminHydroObs(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      id:'',
      observation_date:null,
      hydro_gauge_id:'',
      water_discharge:'',
      water_level:'',
      firstDataGet:false,
      stationsList:null,
      serverPushResponse:null,
      setOpenDialog:false,
      });

if (state.firstDataGet==false){
	if (state.stationsList==null){			
					StationListGet(station_types_id.hydrogauge).then(data=>setState({ ...state, stationsList: data}))		
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
 const dialogClose = () => {
    setState({ ...state, setOpenDialog: false });
  };

const setHydroHaugeId=(event,value)=>{
	if (value!==null){
      setState({ ...state, hydro_gauge_id: value.id });
	}
  }

const setWaterDischarge=(event)=>{
      setState({ ...state, water_discharge: event.target.value });
  }
const setWaterLevel=(event)=>{
      setState({ ...state, water_level: event.target.value });
  }
const setObsDate = date => {
    setState({...state, observation_date: date});
  };
const addNewHyroObs=(hydroObsJson)=>{
	if (
	 hydroObsJson.observation_date != null &&
	  hydroObsJson.hydro_gauge_id != '' &&
	   hydroObsJson.water_discharge != '' &&
	    hydroObsJson.water_level != '' 
){
	var form = new FormData();
	form.append('observation_date', moment(hydroObsJson.observation_date).format("DDMMYYYYTHHmmss"))
	form.append('hydro_gauge_id', hydroObsJson.hydro_gauge_id)
	form.append('water_discharge', hydroObsJson.water_discharge)
	form.append('water_level', hydroObsJson.water_level)
    postNewHydroObservation(form, props.login, props.password).then(data=>{console.log(data);setState({ ...state, serverPushResponse: data,  															          
																	      
																	  	  setOpenDialog:true,})})							
    														  
  }
}
const hydroObsJson = {
                'observation_date':state.observation_date,
                'hydro_gauge_id':state.hydro_gauge_id,
                'water_discharge':state.water_discharge,
                'water_level': state.water_level,

}
const returnStationAutoc=()=>{
	if (state.stationsList!=null){
		return <Autocomplete                    
            
            noOptionsText='Нет совпадений'
            options={state.stationsList.data.stations}
            getOptionLabel={option => option.id.toString()}
            onChange={(event,value)=>setHydroHaugeId(event,value)}
            renderInput={params => (
              <TextField {...params} label='Id гидропоста' variant="standard" fullWidth />
            )}
          />
	}
}

	
		  return (

				  
				    <div className={classes.root} >

					<div >

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

					    <TextField className={classes.textfield} value={state.water_discharge} id="water_discharge" label="Сток воды" type="number" onChange={(event)=>setWaterDischarge(event)}/> 
					    <TextField className={classes.textfield} value={state.water_level} id="water_level" label="Уровень воды" type="number" onChange={(event)=>setWaterLevel(event)}/> 
				  		<div style={{height:"4vh"}}></div>
				  		<Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
					              onClick={()=>addNewHyroObs(hydroObsJson)} 
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
				    
				   
				   </div>
				    
  );
}
		
	


