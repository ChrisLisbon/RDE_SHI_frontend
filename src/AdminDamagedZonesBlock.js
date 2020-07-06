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
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

import {postDamagedZone, DamagedZonesTypesGet} from './request_functions.js'
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


export default function AdminCommonLinksBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      firstDataGet: false,
      damZonesTypes: null,

      type_id: '',
      type:'',
      description_rus:'',
      description_eng:'',
      cost_rub:'',
      start_date:null,
      end_date:null,
      area:'',
      geom:'',      
      
      JSONFileName:' ',
      waitingDialog: false,
      
      logDialog:false,
      logDialogMessage:null
      });


  const form = new FormData();
  form.append('type_id', state.type_id)
  form.append('type', state.type)
  form.append('cost_rub', state.cost_rub)
  form.append('start_date', moment(state.start_date).format("DDMMYYYYTHHmmss"))
  form.append('end_date', moment(state.end_date).format("DDMMYYYYTHHmmss"))
  form.append('description_rus', state.description_rus)
  form.append('description_eng', state.description_eng)
  form.append('area', state.area)
  form.append('geom', state.geom)
  


    const returnMenuItemsTypes = () =>{
            const list = []           
            if (state.damZonesTypes!==null){
              const typesList = state.damZonesTypes.data.types              
            for (let i=0; i<typesList.length; i++){
                  list.push(<MenuItem key={i} value={typesList[i]}>{typesList[i].alias_rus}</MenuItem>)            
          }}
          return list
  }

  const setJSONFile=(file)=>{
    if (file!==undefined){
        if (state.JSONFileName!==undefined){
        setState({ ...state, JSONFileName: file.name,
                               geom: file});
      }

        }}

      


  const setTypeId=(event)=>{
      setState({ ...state, type_id: event.target.value.id,
                           type:event.target.value.type});
}
  const setCostRub=(event)=>{
      setState({ ...state, cost_rub: event.target.value});

  }
  const setStartDate=(event)=>{
      setState({ ...state, start_date: event.target.value});

  }
  const setEndDate=(event)=>{
      setState({ ...state, end_date: event.target.value});

  }
  const setDescRus=(event)=>{
      setState({ ...state, description_rus: event.target.value});

  }
  const setDescEng=(event)=>{
      setState({ ...state, description_eng: event.target.value});

  }
  const setArea=(event)=>{
      setState({ ...state, area: event.target.value});   

  }

  const handleStartDateChange = date => {
    setState({...state, start_date: date});
  };
  const handleEndDateChange = date => {
    setState({...state, end_date: date});
  };

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
      props.closeDialog('damaged_zones_list')
    }
    setState({...state, logDialog: false,
                        logDialogMessage: null});
    }

const pushNewDamagedZone=()=>{
  if(state.type_id!==''&&state.type!==''&&state.description_rus!==''&&state.description_eng!==''&&state.cost_rub!==''&&state.start_date!==null&&state.end_date!==null&&state.area!==''&&state.geom!==''){
    openWaitingDialog()
    postDamagedZone(form, props.login, props.password).then(data=>{closeWaitingDialog();openLogDialog(data)})
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
if (state.firstDataGet==false){
        if (state.damZonesTypes == null){
        DamagedZonesTypesGet().then(data=>setState({ ...state, damZonesTypes: data}))    
      }
      setState({ ...state, firstDataGet: true})
      
    }


  return (
    <div className={classes.box}>
      
      <FormControl className={classes.textfield}>
            <InputLabel >Тип поврежденной территории</InputLabel>
            <Select                
                onChange={(event)=>setTypeId(event)}
              >
              {returnMenuItemsTypes()}
              </Select>
      </FormControl >
      
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <div className={classes.textfield}>
                    <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={state.start_date}
                  onChange={handleStartDateChange}
                  label="Дата и время начала"
                  format="yyyy/MM/dd HH:mm"
                />
                 </div>
                        
          </MuiPickersUtilsProvider>          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.textfield}>
                    <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={state.end_date}
                  onChange={handleEndDateChange}
                  label="Дата и время окончания"
                  format="yyyy/MM/dd HH:mm"
                />
                 </div>
              
              </MuiPickersUtilsProvider>  
              <TextField className={classes.textfield} value={state.cost_rub} onChange={(event)=>setCostRub(event)} type="number" id="cost_rub" label="Ущерб (руб)"/>
              <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>setDescRus(event)} id="description_rus" label="Описание (рус)"/>
              <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>setDescEng(event)} id="description_eng" label="Описание (англ)"/>
              <TextField className={classes.textfield} value={state.area} onChange={(event)=>setArea(event)} type="number" id="area" label="Площадь (км)"/>
              
              <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>setJSONFile(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.JSONFileName} label="Геометрия .geojson"/> 

              <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                                    onClick={()=>pushNewDamagedZone()}>Добавить</Button>


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