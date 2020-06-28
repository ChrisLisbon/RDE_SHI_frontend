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
import AdminMeteoObs from './AdminMeteoObs.js'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

async function pushNewMeteoObsCSV(file)
    {	console.log(file)
    	var formData = new FormData();
    	formData.append('csvFile', file, file.name);
      	let response = await fetch('http://localhost:4444/new_meteo_obs_csv_push', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: formData, 
    });
        let data = await response.json()
        return data
        
      }
async function pushNewMeteoObsXlsx(file)
    {	console.log(file)
    	var formData = new FormData();
    	formData.append('xlsxFile', file, file.name);
      	let response = await fetch('http://localhost:4444/new_meteo_obs_xlsx_push', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: formData, 
    });
        let data = await response.json()
        return data
        
      }

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
    width: '31%',
    margin: '3vh 1% 0',
    display: 'inline-block',
    height: '80vh',

  },
  helpingText:{
  	margin: '3vh 1%',

  }


}
));



async function StationListGet()
		{
			
				let response = await fetch('http://localhost:4444/get_list_of_stations');
				let data = await response.json()
				
				return data
				
			}

export default function AdminMeteoObsChoise(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
		openDialog:false,
		openDialogFileToServer: false,
		CSVFile: null,
		CSVFileName: ' ',
		xlsxFile: null,
		xlsxFileName: ' ',
		responseLog:null,
      });

	const openAddObsDialog =()=>{
		setState({ ...state, openDialog: true });
	}
	const closeAddObsDialog =()=>{
		setState({ ...state, openDialog: false });

	}
	const setLogInfo=(data)=>{
			setState({...state, responseLog: data.status,
								openDialogFileToServer: true,
								CSVFileName: ' ',
								CSVFile: null,
								xlsxFile: null,
								xlsxFileName: ' ',
							})
	}
	const pushCSVFileAndLog=(file)=>{
		pushNewMeteoObsCSV(file).then(data=>{setLogInfo(data)})
		console.log(state)
	}
	const pushXlsxFileAndLog=(file)=>{
		pushNewMeteoObsXlsx(file).then(data=>{setLogInfo(data)})
		console.log(state)
	}
	
	const closeFileToServerDialog=()=>{
		setState({ ...state, openDialogFileToServer: false,
							 responseLog: null});
	}

	const setCSVFile=(file)=>{
		if (file!==undefined){
			if (state.CSVFileName!==undefined){
			setState({ ...state, CSVFileName: file.name,
								 CSVFile: file});
			}
		}
	}
	const setXlsxFile=(file)=>{
		if (file!==undefined){
			if (state.xlsxFileName!==undefined){
			setState({ ...state, xlsxFileName: file.name,
								 xlsxFile: file});
			}
		}
	}
	const returnAddCSVButton=()=>{
		if (state.CSVFileName!==' '){
			var file=state.CSVFile

			return <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{margin:'2vh 2%' }}
					onClick={()=>pushCSVFileAndLog(file) }
					>Добавить</Button> 
		}
	}
	
	const returnAddXlsxButton=()=>{
		if (state.xlsxFileName!==' '){
			var file=state.xlsxFile

			return <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{margin:'2vh 2%' }}
					onClick={()=>pushXlsxFileAndLog(file) }
					>Добавить</Button> 
		}
	}	
		  return (

				  
				    <Paper className={classes.root} >
				    <Typography style={{width:"70%", float: 'left'}}  align='center' color='inherit' gutterBottom>
	                      Добавьте данные о наблюдени вручную или загрузите в формате .csv или .xlsx
	      			</Typography>
	      			<Button variant="outlined"  size="small"  onClick={()=>props.setNullChoise()}  style={{width:"20%", float: 'right'}}>Вернуться </Button>
	      			<div style={{margin: '4vh 0 0 0'}}>
	      			<Card className={classes.textfield} >
			      			<CardContent>
				      			<Typography   align='center' color='inherit' gutterBottom>
				                      Добавить вручную
				      			</Typography>
			      			</CardContent>
			      	<CardActions>		
						<Button
	                    	variant="outlined"
	                    	component="label"
	                    	size="small"
	                    	onClick= {()=>openAddObsDialog()}
	                    >
	                    Добавить                    
	                   </Button>
                   
	                   <Dialog
					        open={state.openDialog}
					        onClose={()=>closeAddObsDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Заполните данные о наблюдении метеостанции
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          <AdminMeteoObs/>
					        </DialogActions>
					   </Dialog> 
				   </CardActions> 
				   </Card>




	      			<Card className={classes.textfield} >
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
	                      Для корректной загрузки файл должен быть такой-то структуры 
	      			</Typography>
	      			</CardContent>
				   </Card>  




				   <Card className={classes.textfield} >
				   <CardContent>
	      			<Typography   align='center' color='inherit' gutterBottom>
	                      Загрузить .xlsx
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
                    <input type="file" style={{ display: "none" }} onChange={(e)=>setXlsxFile(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "60%", margin: '0 0 0 2%'}} value={state.xlsxFileName} label="Имя файла"/>
                   </CardActions>
                   {returnAddXlsxButton()}
                   <CardContent>
                    <Typography className={classes.helpingText} align='justify'  color='secondary' gutterBottom>
	                      Для корректной загрузки файл должен быть такой-то структуры 
	      			</Typography>
	      			</CardContent>
				   </Card>

				   <Dialog
					        open={state.openDialogFileToServer}
					        onClose={()=>closeFileToServerDialog()}>
					        <DialogContent>
					          <DialogContentText color="inherit" align='center' gutterBottom>
					            Файл отправлен на сервер со статусом: {state.responseLog}
					          </DialogContentText>
					        </DialogContent>
					        <DialogActions>
					          <Button onClick={()=>closeFileToServerDialog()}>Закрыть</Button>
					        </DialogActions>
					   </Dialog>

				   </div>
				   </Paper>
				    
  );
}
		
	


