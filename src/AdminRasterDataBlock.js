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

import {postRasterData} from './request_functions.js'
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



export default function AdminRasterDataBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      name_rus:'',
      name_eng:'',
      description_rus:'',
      description_eng:'',
      image_for_map:'',
      image_for_map_extent:'{"Широта min": 0,"Широта max": 0,"Долгота min": 0 ,"Долгота max": 0}',
      file:'',
      legend_file:'',
      source:'',
      image_date:null,
      extent:'',
      
      ImageFileName:' ',
      FileName:' ',
      LegendFileName:' ',
      ExtentFileName:' ',  

      waitingDialog: false,          
      });

  const returnParsedExtent=(string)=>{
    console.log(string)
    var new_string=string.replace(/Широта /g, 'x_')
    var new_string=new_string.replace(/Долгота /g, 'y_')
    console.log(new_string)
    return new_string
  }

  const rasterDataJson=()=>{
    const formData = new FormData();
    formData.append('name_rus', state.name_rus);
    formData.append('name_eng', state.name_eng);
    formData.append('description_rus', state.description_rus);
    formData.append('description_eng', state.description_eng);
    formData.append('image_for_map', state.image_for_map);
    formData.append('image_for_map_extent', JSON.stringify(JSON.parse(returnParsedExtent(state.image_for_map_extent))));
    formData.append('file', state.file);
    formData.append('legend_file', state.legend_file);
    formData.append('source', state.source);
    formData.append('image_date', moment(state.image_date).format("DDMMYYYYTHHmmss"));
    formData.append('extent', state.extent);
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
  const set_image_for_map_extent=(event)=>{
      setState({ ...state, image_for_map_extent: event.target.value});

}

  const handleDateChange = date => {
    setState({...state, image_date: date});
  };

  const set_extent=(file)=>{
    setState({...state, extent: file,
                        ExtentFileName:file.name});
  }
  const set_image_for_map=(file)=>{
    setState({...state, image_for_map: file,
                        ImageFileName: file.name});
  }
  const set_file=(file)=>{
    setState({...state, file: file,
                        FileName:file.name});
  }
  const set_legend_file=(file)=>{
    setState({...state, legend_file: file,
                        LegendFileName:file.name});
  }
  const openWaitingDialog=()=>{
    setState({...state, waitingDialog: true});
  }
  const closeWaitingDialog=()=>{
    setState({...state, waitingDialog: false});
  }

const pushNewRasterData=()=>{
  
  const form=rasterDataJson()
  if(state.name_rus!==''&&state.name_eng!==''&&state.description_rus!==''&&state.description_eng!==''&&state.image_for_map!==''&&state.image_for_map_extent!==''&&state.file!==''&&state.legend_file!==''&&state.source!==''&&state.image_date!==null&&state.extent!==''){
    openWaitingDialog()
    console.log(rasterDataJson)
    postRasterData(form, props.login, props.password).then(data=>{closeWaitingDialog();
        props.closeDialog('raster_data_list')})
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
                value={state.image_date}
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
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_image_for_map(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.ImageFileName} label="Изображение для наложения на карту"/> 
      

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
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.FileName} label="Исходный файл"/>

     <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_legend_file(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.LegendFileName} label="Файл с легендой"/>

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
                                    onClick={()=>pushNewRasterData()}>Добавить</Button>

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