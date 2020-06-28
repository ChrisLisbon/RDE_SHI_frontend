import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import AdminReasonBlock from "./AdminReasonBlock.js"
import AdminTypeBlock from "./AdminTypeBlock.js"

import {postNewReason, postNewType, TypesListGet, ReasonsListGet} from './request_functions.js'

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
  	width: '45%', 
  	float:'left',
  	overflow: 'auto', 
  },
  table2:{
  	width: '50%', 
  	maxWidth: '50%',
  	float: 'right',
  	overflow: 'auto',

  }
}
));

export default function AdminTypeReason(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      typesData: null,
      reasonsData: null,
      firstDataGet: false, 
      reasonState: false,
      typeState: false,
      });
		
const setAddReason = () =>{
    setState({...state, reasonState: true});
    

  }
const closeReasonDialog=()=>{
	setState({...state, reasonState:false})
}
const closeTypeDialog=()=>{
	setState({...state, typeState:false})
}
const addNewReason=(reasonJson)=>{
	if ( reasonJson[0].description_eng != null && reasonJson[0].description_rus != null && reasonJson[0].alias_eng != null && reasonJson[0].alias_rus != null&& reasonJson[0].reason != null){
	const form = new FormData()
	form.append('events_reasons', JSON.stringify(reasonJson))
    postNewReason(form, props.login, props.password).then(data=>{console.log(data);ReasonsListGet().then(data=>{console.log(data);setState({ ...state, reasonState: false,
    														        											 									   reasonsData: data})})})
 }
}
const returnAddReason = () =>{
	if (state.reasonState==true){
	return <AdminReasonBlock addNewReason={(reasonJson)=>addNewReason(reasonJson)}/>
	}
}

const setAddType = () =>{
    setState({...state, typeState: true});
   }

const addNewType=(typeJson)=>{
	if ( typeJson[0].description_eng != null && typeJson[0].description_rus != null && typeJson[0].alias_eng != null && typeJson[0].alias_rus != null && typeJson[0].leaflet_style != null&& typeJson[0].type != null){
	const form = new FormData()
	form.append('events_types', JSON.stringify(typeJson))
    postNewType(form, props.login, props.password).then(data=>{console.log(data);TypesListGet().then(data=>setState({ ...state, typeState: false,
    														  			  										 typesData: data}))})
  }
}	
const returnAddType = () =>{
	if (state.typeState==true){
		console.log('ok')
	return <AdminTypeBlock addNewType={(typeJson)=>addNewType(typeJson)}/>
	}
}

	if (state.firstDataGet==false){
		const list=[]
				ReasonsListGet().then(data=>list.push(data))
							.then(TypesListGet().then(data=>list.push(data))
							.then(data=>setState({ ...state, typesData: list[1],
															 reasonsData:list[0],
															 firstDataGet: true})))
				
				
			}

	const returnReasonsTable=()=>{
		if (state.reasonsData!=null){
			return (<div >
					<Typography  align='center' color='primary' gutterBottom>
					            Причины событий
					    </Typography>

					<Table >
				        <TableHead>
				          <TableRow>
				            <TableCell>Id</TableCell>
				            <TableCell align="center">Описание на английском</TableCell>
				            <TableCell align="center">Описание на русском</TableCell>
				            <TableCell align="center">Название на английском</TableCell>
				            <TableCell align="center">Название на русском</TableCell>
				            <TableCell align="center">Причина</TableCell>
				            
				          </TableRow>
				        </TableHead>
				        <TableBody>
				          {state.reasonsData.data.reasons.map(event_reasons => (
				            <TableRow key={event_reasons.id}>
				              <TableCell>{event_reasons.id}</TableCell>
				              <TableCell align="center">{event_reasons.description_eng}</TableCell>
				              <TableCell align="center">{event_reasons.description_rus}</TableCell>
				              <TableCell align="center">{event_reasons.alias_eng}</TableCell>
				              <TableCell align="center">{event_reasons.alias_rus}</TableCell>
				              <TableCell align="center">{event_reasons.reason}</TableCell>
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
					        onClick={()=>setAddReason()}
					      >
					      Добавить причину
     					 </Button>
				    </div>
				)
		}
	}
		const returnTypesTable=()=>{
		if (state.typesData!=null){
			return (<div >
					<Typography   align='center' color='primary' gutterBottom>
					            Типы событий
					    </Typography>
					<Table>
				        <TableHead>
				          <TableRow>
				            <TableCell>Id</TableCell>
				            <TableCell align="center">Описание на английском</TableCell>
				            <TableCell align="center">Описание на русском</TableCell>
				            <TableCell align="center">Название на английском</TableCell>
				            <TableCell align="center">Название на русском</TableCell>
				            <TableCell align="center">Тип</TableCell>
				            <TableCell align="center">Leaflet style</TableCell>
				          </TableRow>
				        </TableHead>
				        <TableBody>
				          {state.typesData.data.types.map(event_types => (
				            <TableRow key={event_types.id}>
				              <TableCell>{event_types.id}</TableCell>
				              <TableCell align="center">{event_types.description_eng}</TableCell>
				              <TableCell align="center">{event_types.description_rus}</TableCell>
				              <TableCell align="center">{event_types.alias_eng}</TableCell>
				              <TableCell align="center">{event_types.alias_rus}</TableCell>
				              <TableCell align="center">{event_types.type}</TableCell>
				              <TableCell align="center">{event_types.leaflet_style}</TableCell>
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
					        onClick={()=>setAddType()}
					      >
					      Добавить тип
     					 </Button>
				     </div>
				)
		}
	}
		  return (

				  
				    <Paper className={classes.root} >
					    <Typography style={{margin:"0 0 0 40%", float: 'left'}} align='center' gutterBottom>
					            Добавьте новый тип или причину события
					    </Typography>
					   <Button variant="outlined"  size="small"  onClick={()=>props.setNullChoise()}	style={{width:"20%", float: 'right'}}		              
					    >Вернуться </Button>
					<div className={classes.table1}>
				   {returnReasonsTable()}
				   <Dialog
					        open={state.reasonState}
					        onClose={()=>closeReasonDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о причине события
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          {returnAddReason()}
					        </DialogActions>
					   </Dialog> 
				   
				   </div> 
				   <div className={classes.table2}>
				   {returnTypesTable()}
				   <Dialog
					        open={state.typeState}
					        onClose={()=>closeTypeDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о типе события
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          {returnAddType()}
					        </DialogActions>
					   </Dialog> 
				   				   
				   </div>
				   
				   



					</Paper>
				    
  );
}
		
	


