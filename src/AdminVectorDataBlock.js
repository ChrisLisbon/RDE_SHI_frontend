import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

import {postVectorData} from './request_functions.js'
var moment = require('moment');
moment().format();

const useStyles = makeStyles(theme => ({
  box: {

    width: '100%',
    
  },
  margin: {
    margin: '0 0 0 0',
    fontSize: 11,
    
  },
  textfield: {
    width: '100%'
    
  },
  textfield2: {
    width: '100%', 
    height: '5vh',
  },

}));



export default function AdminVectorDataBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      name_rus:'',
      name_eng:'',
      description_rus:'',
      description_eng:'',      
      file:'',
      source:'',
      vector_date:null,
      geojson_for_map:'',
      
      FileName:' ',
      GeojsonFileName:' ', 
      
      logDialog:false,
      logDialogMessage:null
      });


  const vectorDataJson=()=>{
    const formData = new FormData();
    formData.append('name_rus', state.name_rus);
    formData.append('name_eng', state.name_eng);
    formData.append('description_rus', state.description_rus);
    formData.append('description_eng', state.description_eng);
    formData.append('file', state.file);
    formData.append('source', state.source);
    formData.append('vector_date', moment(state.vector_date).format("DDMMYYYYTHHmmss"));
    formData.append('geojson_for_map', state.geojson_for_map);
    return formData
  }
  
  const set_name_rus=(event)=>{
      setState({ ...state, name_rus: event.target.value});

}
  const set_name_eng=(event)=>{
      setState({ ...state, name_eng: event.target.value});

}
  const set_description_rus=(event)=>{
      setState({ ...state, description_rus: event.target.value});

}
  const set_description_eng=(event)=>{
      setState({ ...state, description_eng: event.target.value});

}

  const set_sourse=(event)=>{
      setState({ ...state, source: event.target.value});

}

  const handleDateChange = date => {
    setState({...state, vector_date: date});
  };

  const set_file=(file)=>{
    setState({...state, file: file,
                        FileName:file.name});
  }
  const set_geojson_for_map=(file)=>{
    setState({...state, geojson_for_map: file,
                        GeojsonFileName:file.name});
  }

  const openWaitingDialog=()=>{
    setState({...state, waitingDialog: true});
  }
  const closeWaitingDialog=()=>{
    setState({...state, waitingDialog: false});
  }

  const openLogDialog=(message)=>{
    setState({...state, logDialogMessage: message,
                        logDialog: true});
  }
  const closeLogDialog=()=>{
    console.log()
    if (state.logDialogMessage.status=='ok'){
      props.closeDialog('vector_data_list')
    }
    setState({...state, logDialog: false,
                        logDialogMessage: null});
    }

const pushNewVectorData=()=>{
  
  const form=vectorDataJson()
  if(state.name_rus!==''&&state.name_eng!==''&&state.description_rus!==''&&state.description_eng!==''&&state.file!==''&&state.geojson_for_map!==''&&state.source!==''&&state.vector_date!==null){
    openWaitingDialog()
    postVectorData(form, props.login, props.password).then(data=>{closeWaitingDialog();openLogDialog(data)})
  }
}
  
const returnLog=()=>{
  if (state.logDialogMessage!=null){
    if (state.logDialogMessage.status=='ok'){
      return <div>                      
                  <DialogContent >
                  <div style={{display: 'flex', justifyContent:"center"}}>
                  <CheckCircleOutlineIcon style={{ color: green[500], fontSize: 40}}/>
                  </div>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Данные успешно добавлены
                    </DialogContentText>
                  </DialogContent>
              </div>
    }
    if (state.logDialogMessage.status!='ok'){
      return  <div>                      
                  <DialogContent >
                  <div style={{display: 'flex', justifyContent:"center"}}>
                  <CancelIcon style={{ color: red[500], fontSize: 40}}/>
                  </div>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                    {state.logDialogMessage.status+': '+state.logDialogMessage.comment}
                    </DialogContentText>
                  </DialogContent>
              </div>
    }
  }
  else{
    return null
  }
}
  return (
    <div className={classes.box}>
      <TextField className={classes.textfield} value={state.name_rus} onChange={(event)=>set_name_rus(event)}  id="name_rus" label="Название (рус)"/>
      <TextField className={classes.textfield} value={state.name_eng} onChange={(event)=>set_name_eng(event)}  id="name_eng" label="Название (англ)"/>
      <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>set_description_rus(event)}  id="description_rus" label="Описание (рус)"/>
      <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>set_description_eng(event)}  id="description_eng" label="Описание (англ)"/>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <div className={classes.textfield}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="Date"
                label="Дата"
                value={state.vector_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              </div>          
            </MuiPickersUtilsProvider>          

      
      <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_file(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.FileName} label="Исходный файл(kml, dxf, geojson, csv, gpkg, svg, tar, zip, rar)"/>

     <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_geojson_for_map(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.GeojsonFileName} label="Файл .geojson для наложения на карту"/>

      <TextField className={classes.textfield} value={state.source} onChange={(event)=>set_sourse(event)}  id="source" label="Источник"/>              
               

              <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                                    onClick={()=>pushNewVectorData()}>Добавить</Button>


      <Dialog
        open={state.waitingDialog}
        maxWidth = 'lg'
        scroll = 'body'
      >
      <DialogContent>
        <div style={{display: 'flex', justifyContent:"center", margin: '30% 0 0'}}>
          <CircularProgress style={{color: green[500]}}/>
        </div>
        <Typography variant="body2" component="p">
          Сохранение...
        </Typography>
      </DialogContent>
      </Dialog>
      <Dialog
          open={state.logDialog}
          onClose={()=>closeLogDialog()}>      
          {returnLog()}
      </Dialog> 
    </div>
  )
}