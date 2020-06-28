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
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AdminHydroObs from './AdminHydroObs.js'
import AdminMeteoObs from './AdminMeteoObs.js'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';

import {postNewHydroObservation, postNewMeteoObservation, StationListGet} from './request_functions.js'


const useStyles = makeStyles(theme => ({
  root: {
    margin: '3vh 2%',
    padding: '1%',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'auto',
    width: '94%',
  },

  textfield: {
    width: '47%',
    margin: '3vh 1% 0',
    height: '80vh',
    float:'left',
  },
    textfield2: {
    width: '47%',
    margin: '3vh 1% 0',
    height: '80vh',
    float:'right',
  },
  helpingText:{
  	margin: '1vh 1%',

  }


}
));

export default function AdminObservationsChoise(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
		openDialog:false,
		openDialogFileToServer: false,
		openMeteoDialog:false,
		CSVFile: null,
		CSVFileName: ' ',
		MeteoCSVFile: null,
		MeteoCSVFileName: ' ',
		responseLog:null,
      });

	const openAddObsDialog =()=>{
		setState({ ...state, openDialog: true });
	}
	const openAddMeteoObsDialog =()=>{
		setState({ ...state, openMeteoDialog: true });
	}
	const closeAddObsDialog =()=>{
		setState({ ...state, openDialog: false });

	}
	const closeAddMeteoObsDialog =()=>{
		setState({ ...state, openMeteoDialog: false });

	}
	const openDialogServer=()=>{
		setState({...state, openDialogFileToServer: true,
								
								
							})
	}
	const setLogInfo=(data)=>{
			setState({...state, responseLog: data,
								openDialogFileToServer: true,
								
							})
	}
	const pushHydroCSVFileAndLog=(form)=>{
		postNewHydroObservation(form, props.login, props.password).then(data=>{console.log(data);setLogInfo(data)})
	}

	const pushMeteoCSVFileAndLog=(form)=>{
		postNewMeteoObservation(form, props.login, props.password).then(data=>{console.log(data);setLogInfo(data)})
	}	
	
	const closeFileToServerDialog=()=>{
		setState({ ...state, openDialogFileToServer: false,
							 responseLog: null,
							 CSVFile: null,
							 CSVFileName: ' ',
							 MeteoCSVFile: null,
							 MeteoCSVFileName: ' ',});
	}

	const setCSVFile=(file)=>{
		if (file!==undefined){
			if (state.CSVFileName!==undefined){
			setState({ ...state, CSVFileName: file.name,
								 CSVFile: file});
			}
		}
	}
	const setMeteoCSVFile=(file)=>{
		if (file!==undefined){
			if (state.MeteoCSVFileName!==undefined){
			setState({ ...state, MeteoCSVFileName: file.name,
								 MeteoCSVFile: file});
			}
		}
	}
	const returnDialogContent=()=>{
		if (state.responseLog!==null){
			if (state.responseLog.status=='ok'){
			return 			<div ><DialogContent>
							<DialogContentText color="inherit" align='center' gutterBottom>
					            Данные успешно загружены
					          </DialogContentText>

					        </DialogContent>
					        <DialogActions>
					          <Button onClick={()=>closeFileToServerDialog()}>Закрыть</Button>
					        </DialogActions></div>
			}
			if (state.responseLog.status!=='ok'){
						return <div ><DialogContent>
							<DialogContentText color="inherit" align='center' gutterBottom>
					            Данные не были загружены! Ошибка: {state.responseLog.comment}
					          </DialogContentText>

					        </DialogContent>
					        <DialogActions>
					          <Button onClick={()=>closeFileToServerDialog()}>Закрыть</Button>
					        </DialogActions></div>
			}
		}
		if (state.responseLog==null){
			 
					return<Card>
					<CardContent >
					<div style={{display: 'flex', justifyContent:"center"}}>
					<CircularProgress style={{color: green[500]}}/> 
					</div>                   
                    <Typography color="inherit" align='center' gutterBottom>
                      Ожидание ответа сервера...
                    </Typography>
                    </CardContent>
                    </Card>
		}
	}
	const returnAddCSVButton=()=>{
		if (state.CSVFileName!==' '){
			var file=state.CSVFile
			var form=new FormData();
			form.append('hydro_observations', file)
			return <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{margin:'2vh 2%' }}
					onClick={()=>pushHydroCSVFileAndLog(form)}
					>Добавить</Button> 
		}
	}
	const returnAddMeteoCSVButton=()=>{
		if (state.MeteoCSVFileName!==' '){
			var file=state.MeteoCSVFile
			var form=new FormData();
			form.append('meteo_observations', file)
			return <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{margin:'2vh 2%' }}
					onClick={()=>{openDialogServer();pushMeteoCSVFileAndLog(form)}}
					>Добавить</Button> 
		}
	}
	
	
		  return (

				  
				    <Paper className={classes.root} >
	      			<Button variant="outlined"  size="small"  onClick={()=>props.setNullChoise()}  style={{width:"20%", float: 'right'}}>Вернуться </Button>
	      			<div style={{margin: '4vh 0 0 0'}}>
	      			<Card className={classes.textfield} >
	      			<div>
			      			<CardContent>
			      				<Typography   align='center' color='primary' variant="h5" gutterBottom>
				                      Наблюдения гидропостов
				      			</Typography>
				      			<Typography   align='center' color='inherit' gutterBottom>
				                      Добавить вручную
				      			</Typography>
				      		</CardContent>
				      	<CardActions style={{justifyContent: 'center'}}>
				      			<Button
	                    	variant="outlined"
	                    	component="label"
	                    	size="medium"
	                    	color="primary"
	                    	onClick= {()=>openAddObsDialog()}
	                    >
	                    Добавить                    
	                   </Button>     					
                   
	                   <Dialog
					        open={state.openDialog}
					        onClose={()=>closeAddObsDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о наблюдении гидропоста
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          <AdminHydroObs login={props.login} password={props.password}/>
					        </DialogActions>
					   </Dialog> 
				   </CardActions> 
				   </div>
				   <div>
				   			<CardContent>
		      			<Typography   align='center' color='inherit' gutterBottom>
		                      Загрузить .csv
		      			</Typography>
		      			</CardContent>
		      			<CardActions>
						<Button
	                    	variant="outlined"
	                    	component="label"
	                    	size="small"
	                    	style={{ width: "35%" }}
	                    >
	                    Выберите файл
	                    <input type="file" style={{ display: "none" }} onChange={(e)=>setCSVFile(e.target.files[0])}/>
	                   </Button> 
	                   <TextField style={{ width: "60%", margin: '0 0 0 2%'}} value={state.CSVFileName} label="Имя файла"/>                                    
	                   </CardActions>                   
	                   {returnAddCSVButton()}
	                   <CardContent>
	                    <Typography  className={classes.helpingText} align='justify' color='secondary' gutterBottom>
		                      Для корректной загрузки файл должен иметь следующую структуру: 
		                </Typography>
		                <Typography color='secondary'>
		                      1) Разделители - запятые (,); 
		                </Typography>
		                <Typography color='secondary'>
		                      2) Первая строка - названия столбцов (water_discharge, water_level, hydro_gauge_id, observation_date) в произвольном порядке;
		                </Typography> 
		                <Typography color='secondary'>     
		                      3) Формат даты/времени: %d%m%YT%H%M%S (Пример:12052012T000000).
		      			</Typography>
		      			</CardContent>
		      			
				   </div>				   
				   </Card>





	      			<Card className={classes.textfield2} >
	      			<div>
			      			<CardContent>
			      				<Typography   align='center' color='primary' variant="h5" gutterBottom>
				                      Наблюдения метеостанций
				      			</Typography>
				      			<Typography   align='center' color='inherit' gutterBottom>
				                      Добавить вручную
				      			</Typography>
				      		</CardContent>
				      	<CardActions style={{justifyContent: 'center'}}>
				      			<Button
	                    	variant="outlined"
	                    	component="label"
	                    	size="medium"
	                    	color="primary"
	                    	onClick= {()=>openAddMeteoObsDialog()}
	                    >
	                    Добавить                    
	                   </Button>     					
                   
	                   <Dialog
					        open={state.openMeteoDialog}
					        onClose={()=>closeAddMeteoObsDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о наблюдении метеостанции
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          <AdminMeteoObs login={props.login} password={props.password}/>
					        </DialogActions>
					   </Dialog> 
				   </CardActions> 
				   </div>
				   <div>
				   			<CardContent>
		      			<Typography   align='center' color='inherit' gutterBottom>
		                      Загрузить .csv
		      			</Typography>
		      			</CardContent>
		      			<CardActions>
						<Button
	                    	variant="outlined"
	                    	component="label"
	                    	size="small"
	                    	style={{ width: "35%" }}
	                    >
	                    Выберите файл
	                    <input type="file" style={{ display: "none" }} onChange={(e)=>setMeteoCSVFile(e.target.files[0])}/>
	                   </Button> 
	                   <TextField style={{ width: "60%", margin: '0 0 0 2%'}} value={state.MeteoCSVFileName} label="Имя файла"/>                                    
	                   </CardActions>                   
	                   {returnAddMeteoCSVButton()}
	                   <CardContent>
	                    <Typography  className={classes.helpingText} align='justify' color='secondary' gutterBottom>
		                      Для корректной загрузки файл должен иметь следующую структуру: 
		                </Typography>
		                <Typography color='secondary'>
		                      1) Разделители - запятые (,); 
		                </Typography>
		                <Typography color='secondary'>
		                      2) Первая строка - названия столбцов (air_temperature, precipitations, meteo_station_id, observation_date) в произвольном порядке;
		                </Typography> 
		                <Typography color='secondary'>     
		                      3) Формат даты/времени: %d%m%YT%H%M%S (Пример:12052012T000000).
		      			</Typography>
		      			</CardContent>
		      			<Dialog
					        open={state.openDialogFileToServer}
					        >
					        {returnDialogContent()}
					         
					          
					   </Dialog>
				   </div>				   
				   </Card>


				   </div>
				   </Paper>
				    
  );
}