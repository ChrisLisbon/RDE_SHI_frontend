import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import {EventsForPlaceGet} from './request_functions.js'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '3vh 2%',
    padding: '1%',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'auto',
    width: '94%',
  },
  table1:{
  	width: '100%', 
  	
  	overflow: 'auto', 
  },

}
));

const columns = [
  {
  name: "id",
  label: "ID",
  options: {
   filter: false,

  }
 },
 {
  name: "name_rus",
  label: "Название",
  options: {
   filter: false,

  }
 },
 {
  name: "description_rus",
  label: "Описание",
  options: {
   filter: false,

  }
 },
 {
  name: "reason",
  label: "Причина",
  options: {
   filter: true,

  }},
  {
  name: "type",
  label: "Тип",
  options: {
   filter: false,

  }},
  {
  name: "cost_rub",
  label: "Ущерб(руб.)",
  options: {
   filter: false,

  }},
  {
  name: "area_km",
  label: "Поврежденная территория, км",
  options: {
   filter: false,

  },
 },
 
];

export default function AdminEventsTableForPlace(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      
      eventsData: null,
      firstDataGet: false, 
      condition: 'waiting'
      
      });

const data = ()=>{
	if (state.eventsData!==null&&state.eventsData!==undefined){
		var list = []
		state.eventsData.data.events.map((events) =>{
       	list.push(events)            
    })
  return list
	}
}

const setEventId=(event)=>{
	var eventName=event[1]
	var eventId=event[0]
  props.setIdForOldEvent(eventName, eventId)
}

const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  search: true,
  responsive: 'scrollMaxHeight',
  selectableRowsHeader: false,
  selectableRows: 'none',
  pagination:false,
  onRowClick: (event)=>setEventId(event),  
  textLabels: {
    body: {
      noMatch: "Совпадения не найдены",
    }},
  fixedHeader: true
};	


	if (state.firstDataGet==false){
				if (state.eventsData == null){
        console.log(props.placeId)
        setState({ ...state, condition: 'waiting'});
				EventsForPlaceGet(props.placeId).then(data=>setState({ ...state, eventsData: data,
                                                                         condition: 'table'}))		
			}			

			setState({ ...state, firstDataGet: true})
		}
	
		
	if (state.condition=='table'){
		  return (				  
				    <MuiThemeProvider >
				        <MUIDataTable 
				          title= 'Доступные для выбора события'
				          data={data()}
				          columns={columns}
				          options={options}

				        />
				    </MuiThemeProvider>				    
              );
  }
  if (state.condition=='waiting'){
      return (
            <div>
            <div style={{display: 'flex', justifyContent:"center", margin: '30% 0 0'}}>
              <CircularProgress style={{color: green[500]}}/>
            </div>
            <Typography color="inherit" align='center' gutterBottom>
                      Загрузка данных...
            </Typography>
            </div>
        )
    }
}
		
	


