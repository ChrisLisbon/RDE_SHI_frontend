import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import AdminStationBlock from "./AdminStationBlock.js"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {ObservationStationsTypesListGet, postNewStation, StationListGet} from './request_functions.js'

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


export default function AdminStatons(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      
      stationData: null,
      stationTypesData: null,
      firstDataGet: false, 
      stationStateDialog: false,
      
      });
		
const setAddStation = () =>{
    setState({...state, stationStateDialog: true});

  }

const addNewStation=(stationJson)=>{
	if (
	 stationJson[0].description_eng != null &&
	  stationJson[0].description_rus != null &&
	   stationJson[0].name_eng != null &&
	    stationJson[0].name_rus != null &&
	     stationJson[0].type_id != null &&
	     stationJson[0].host != null &&
	     stationJson[0].lat != null &&
	     stationJson[0].lon != null &&
	     stationJson[0].elevation != null&&
	     stationJson[0].danger_values != '[{"description":"Описание", "value": "0"}]'
	     ){
	const form = new FormData()
	form.append('stations', JSON.stringify(stationJson))
    postNewStation(form, props.login, props.password).then(data=>{console.log(data);setState({ ...state, stationStateDialog: false,
    														  firstDataGet:false,
    														  stationData: null,})})
  }
}
const returnAddStation = () =>{
	if (state.stationStateDialog==true){
		
	return <AdminStationBlock addNewStation={(stationJson)=>addNewStation(stationJson)} stationTypesList={state.stationTypesData.data.types}/>
	}
}



	if (state.firstDataGet==false){
				if (state.stationData == null){
				StationListGet().then(data=>setState({ ...state, stationData: data}))		
			}
				if (state.stationTypesData == null){
				ObservationStationsTypesListGet().then(data=>setState({ ...state, stationTypesData: data}))		
			}

			setState({ ...state, firstDataGet: true})
		}
	const closeStationStateDialog=()=>{
		setState({...state, stationStateDialog: false})
	}
	const returnStringDV=(s)=>{
		const finalList=[]
		const obj=JSON.parse(s)
		for (var key in obj){
			const r = obj[key]
			r.forEach((el)=>{
				const str=el.description+': '+el.value+';\n '
				finalList.push(str)
			})
			const a=finalList.join('')
			return a
	}
}
	const returnStationTable=()=>{
		if (state.stationData!=null){
			console.log(state.stationData)

			return (<div >
					
	      				<Button variant="outlined"  size="small"  onClick={()=>props.setNullChoise()}	style={{width:"20%", float: 'right'}}		              
					    >Вернуться </Button>
					<Table >
				        <TableHead>
				          <TableRow>
				            <TableCell>Id</TableCell>
				            <TableCell align="center">Название на русском</TableCell>
				            <TableCell align="center">Название на английском</TableCell>
				            <TableCell align="center">Описание на русском</TableCell>
				            <TableCell align="center">Описание на английском</TableCell>
				            <TableCell align="center">Опасные уровни</TableCell>
				            
				            
				            <TableCell>Host</TableCell>
				            <TableCell>Широта</TableCell>
				            <TableCell>Долгота</TableCell>
				            <TableCell>Высота над уровнем моря(м)</TableCell>
				            
				          </TableRow>
				        </TableHead>
				        <TableBody>
				          {state.stationData.data.stations.map(stations => (
				            <TableRow key={stations.id}>
				              <TableCell>{stations.id}</TableCell>
				              <TableCell align="center">{stations.name_rus}</TableCell>
				              <TableCell align="center">{stations.name_eng}</TableCell>
				              <TableCell align="center">{stations.description_rus}</TableCell>
				              <TableCell align="center">{stations.description_eng}</TableCell>
				              <TableCell align="center">{returnStringDV(stations.danger_values)}</TableCell>
				              
				              
				              <TableCell align="center">{stations.host}</TableCell>
				              <TableCell align="center">{stations.lat}</TableCell>
				              <TableCell align="center">{stations.lon}</TableCell>
				              <TableCell align="center">{stations.elevation}</TableCell>
				              

				            </TableRow>
				          ))}
				        </TableBody>
				      </Table>
				      <br/>
				          <Button
					        variant="contained"
					        color="primary"	
					        size="small"				        
					        startIcon={<AddIcon />}
					        onClick={()=>setAddStation()}
					      >
					      Добавить станцию
     					 </Button>
				    </div>
				)
		}
	}
		
	
		  return (

				  
				    <Paper className={classes.root} >
					<div >
					   {returnStationTable()} 
					   	<Dialog
					        open={state.stationStateDialog}
					        onClose={()=>closeStationStateDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о станции наблюдения
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          {returnAddStation()}
					        </DialogActions>
					   </Dialog>
					   
				   </div>
				   </Paper>
				    
  );
}
		
	


