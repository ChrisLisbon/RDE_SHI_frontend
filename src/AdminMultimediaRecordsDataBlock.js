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

import {postMultimediaRecordsData, MultimediaRecordsTypesListGet} from './request_functions.js'

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


export default function AdminMultimediaRecordsDataBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      firstDataGet:false,
      types_list: null,

      name_rus:'',
      name_eng:'',
      description_rus:'',
      description_eng:'',
      source:'',
      file:'',
      type:'',
      type_id:'',
      record_localization:'',

      FileName:' ',
         
      });


  const multimediaRecordsDataJson=()=>{
    const formData = new FormData();
    formData.append('name_rus', state.name_rus);
    formData.append('name_eng', state.name_eng);
    formData.append('description_rus', state.description_rus);
    formData.append('description_eng', state.description_eng);
    formData.append('file', state.file);
    formData.append('source', state.source);
    formData.append('type', state.type);
    formData.append('type_id', state.type_id);
    formData.append('record_localization', state.record_localization);
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

  const set_source=(event)=>{
      setState({ ...state, source: event.target.value});

}
  const set_type=(event)=>{
      const id=event.target.value
      state.types_list.data.types.forEach(element=>{
        if (id==element.id){
          const type=element.type
          setState({ ...state, type_id: event.target.value,
                           type: type});
        }}
      )

}
  const set_record_localization=(event)=>{
      const string=event.target.value;
      setState({ ...state, record_localization_str: string});
      const coordList=string.split(',')
      if (coordList[0]!==undefined &&coordList[1]!==undefined&&coordList[0]!=='' &&coordList[1]!==''){      
      const pointWKT='POINT('+coordList[1]+' '+coordList[0]+')'
      setState({ ...state, record_localization: pointWKT,
                           record_localization_str: string })
      }
      if (coordList[0]==undefined||coordList[1]==undefined||coordList[0]==''||coordList[1]==''){
        setState({ ...state, record_localization: '',
                             record_localization_str: string })
      }                     

}


  const set_file=(file)=>{
    setState({...state, file: file,
                        FileName:file.name});
  }


  const openWaitingDialog=()=>{
    setState({...state, waitingDialog: true});
  }
  const closeWaitingDialog=()=>{
    setState({...state, waitingDialog: false});
  }
const pushNewMultimediaRecordsData=()=>{
  
  const form=multimediaRecordsDataJson()
  if(state.name_rus!==''&&state.name_eng!==''&&state.description_rus!==''&&state.description_eng!==''&&state.file!==''&&state.source!==''&&state.type!==''&&state.type_id!==''&&state.record_localization!==''){
    openWaitingDialog()
    postMultimediaRecordsData(form, props.login, props.password).then(data=>{closeWaitingDialog();
        props.closeDialog('multimedia_records_data_list')})
  }
}
  
  const returnMenuItemsTypes = () =>{
    const list = []
    if (state.types_list!=null){
      const types_list= state.types_list.data.types      
      for (let i=0; i<types_list.length; i++){
              list.push(<MenuItem key={i} value={types_list[i].id}>{types_list[i].alias_rus}</MenuItem>)
      
      }
  }
    return list
  }

if (state.firstDataGet==false){
  MultimediaRecordsTypesListGet().then(data=>setState({...state, types_list: data,
                                                                 firstDataGet:true}))
}


  return (
    <div className={classes.box}>
      <TextField className={classes.textfield} value={state.name_rus} onChange={(event)=>set_name_rus(event)}  id="name_rus" label="Название (рус)"/>
      <TextField className={classes.textfield} value={state.name_eng} onChange={(event)=>set_name_eng(event)}  id="name_eng" label="Название (англ)"/>
      <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>set_description_rus(event)}  id="description_rus" label="Описание (рус)"/>
      <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>set_description_eng(event)}  id="description_eng" label="Описание (англ)"/>

      <div className={classes.textfield}>
          <InputLabel>Тип файла</InputLabel>
            <Select 
              style={{width:'100%'}}
              value={state.type_id}
              onChange={(event)=>set_type(event)}>
              {returnMenuItemsTypes()}
            </Select> 
          </div>
      
      <TextField className={classes.textfield} value={state.source} onChange={(event)=>set_source(event)}  id="source" label="Источник"/>
      <TextField className={classes.textfield} value={state.record_localization_str} onChange={(event)=>set_record_localization(event)}  id="record_localization" label="Координаты (широта, долгота - разделитель - ,)"/>
      
      <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_file(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.FileName} label="Файл"/>
           


              <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                                    onClick={()=>pushNewMultimediaRecordsData()}>Добавить</Button>


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
    </div>
  )
}