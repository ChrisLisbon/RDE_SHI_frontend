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
import { KeyboardDateTimePicker } from "@material-ui/pickers";

import {postRemoteSensingData} from './request_functions.js'
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



async function pushRemoteSensingData(form)
    {   console.log(form)
        let response = await fetch('http://localhost:4444/new_remote_sensing_data_push', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: form, // тип данных в body должен соответвовать значению заголовка "Content-Type"
    });
        let data = await response.json()
        return data
        
      }

export default function AdminRemoteSensingDataBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({

      description_rus:'',
      description_eng:'',
      image_for_map:'',
      image_for_map_extent:'{"Широта min": 0,"Широта max": 0,"Долгота min": 0 ,"Долгота max": 0}',
      file:'',
      image_date:null,
      sensor: '',
      source:'',
      extent:'',
      
      ImageFileName:' ',
      FileName:' ',
      ExtentFileName:' ',
      waitingDialog: false,
      
      logDialog:false,
      logDialogMessage:null
      });

  const returnParsedExtent=(string)=>{
    var new_string=string.replace(/Широта /g, 'x_')
    var new_string=new_string.replace(/Долгота /g, 'y_')
    return new_string
  }

  const remoteSensingDataJson=()=>{
    const formData = new FormData();
    formData.append('description_rus', state.description_rus);
    formData.append('description_eng', state.description_eng);
    formData.append('image_for_map', state.image_for_map);
    formData.append('image_for_map_extent', JSON.stringify(JSON.parse(returnParsedExtent(state.image_for_map_extent))));
    formData.append('file', state.file);
    formData.append('source', state.source);
    formData.append('image_date', moment(state.image_date).format("DDMMYYYYTHHmmss"));
    formData.append('sensor', state.sensor);
    formData.append('extent', state.extent);
    return formData
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
  const set_sensor=(event)=>{
      setState({ ...state, sensor: event.target.value});

}
  const set_image_for_map_extent=(event)=>{
      setState({ ...state, image_for_map_extent: event.target.value});

}

  const handleDateChange = date => {
    setState({...state, image_date: date});
  };


  const set_image_for_map=(file)=>{
    setState({...state, image_for_map: file,
                        ImageFileName: file.name});
  }
  const set_file=(file)=>{
    setState({...state, file: file,
                        FileName:file.name});
  }

  const set_extent=(file)=>{
    setState({...state, extent: file,
                        ExtentFileName:file.name});
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
      props.closeDialog('remote_sensing_data_list')
    }
    setState({...state, logDialog: false,
                        logDialogMessage: null});
    }

const pushNewRemoteSensingData=()=>{
  
  const form=remoteSensingDataJson()
  if(state.description_rus!==''&&state.description_eng!==''&&state.image_for_map!==''&&state.image_for_map_extent!==''&&state.file!==''&&state.sensor!==''&&state.source!==''&&state.image_date!==null){
    openWaitingDialog()
    postRemoteSensingData(form, props.login, props.password).then(data=>{closeWaitingDialog();openLogDialog(data)})
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
      <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>set_description_rus(event)}  id="description_rus" label="Описание (рус)"/>
      <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>set_description_eng(event)}  id="description_eng" label="Описание (англ)"/>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
               
              <div className={classes.textfield}>
                    <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={state.image_date}
                  onChange={handleDateChange}
                  label="Дата и время"
                  format="yyyy/MM/dd HH:mm"
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
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_image_for_map(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.ImageFileName} label="Изображение для наложения на карту(png, tiff, tif, jpeg, jpg, bmp, svg)"/> 
      

      <TextField className={classes.textfield} value={state.image_for_map_extent} onChange={(event)=>set_image_for_map_extent(event)}  id="image_for_map_extent" label="Охват изображения"/>

      
      <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_file(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.FileName} label="Исходный файл(png, tiff, tif, jpeg, jpg, bmp, svg, tar, zip, rar)"/>


      <TextField className={classes.textfield} value={state.sensor} onChange={(event)=>set_sensor(event)}  id="sensor" label="Название сенсора"/>
      <TextField className={classes.textfield} value={state.source} onChange={(event)=>set_sourse(event)}  id="source" label="Источник"/>              
      <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_extent(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.ExtentFileName} label="Охват изображения .geojson"/> 
              <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                                    onClick={()=>pushNewRemoteSensingData()}>Добавить</Button>


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