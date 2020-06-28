import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import {placesListGet} from './request_functions.js'

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
   filter: true,

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
  name: "point_geom",
  label: "Координаты",
  options: {
   filter: false,

  }
 },
 
];


export default function AdminPlacesTable(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      
      placesData: null,
      firstDataGet: false, 
      condition: 'waiting'
      
      });
const data = ()=>{
	if (state.placesData!==null){
		var list = []
		state.placesData.data.places.map((places) =>{
       	list.push(places)            
    })
  console.log(list)
  return list
	}
}
const setPlace=(event)=>{
	var placeName=event[1]
	var placeId=event[0]
  
  if (props.mode=='old'){
    console.log('++++++++++=++++++++++')
    props.setPlaceForOldEvent(placeName, placeId)
  }
  else{
    props.setPlaceForEvent(placeName, placeId)
  }
	

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
  onRowClick: (event)=>setPlace(event),  
  textLabels: {
    body: {
      noMatch: "Совпадения не найдены",
    }},
  fixedHeader: true
};		
	if (state.firstDataGet==false){
				if (state.placesData == null){
        setState({ ...state, condition: 'waiting'});
				placesListGet().then(data=>setState({ ...state, placesData: data,
                                                        condition: 'table'}))		
			}
			

			setState({ ...state, firstDataGet: true})
		}
	
		
	  if (state.condition=='table'){
		  return (				  
				    <MuiThemeProvider >
				        <MUIDataTable 
				          title= 'Доступные для выбора места'
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
		
	


