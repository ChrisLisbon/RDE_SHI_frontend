import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import Divider from '@material-ui/core/Divider';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AdminCommonLinksBlock from './AdminCommonLinksBlock.js'
import AdminMediaLinksBlock from './AdminMediaLinksBlock.js'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import AdminDamagedZonesBlock from './AdminDamagedZonesBlock.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AdminRasterDataBlock from './AdminRasterDataBlock.js'
import AdminVectorDataBlock from './AdminVectorDataBlock.js'
import AdminRemoteSensingDataBlock from './AdminRemoteSensingDataBlock.js'
import AdminMultimediaRecordsDataBlock from './AdminMultimediaRecordsDataBlock.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CancelIcon from '@material-ui/icons/Cancel';
import { green,red } from '@material-ui/core/colors';
import { KeyboardDateTimePicker } from "@material-ui/pickers";

import {API_settings} from './server_settings.js'
import {rewriteEventData, postNewEventData, TypesListGet, ReasonsListGet, CommonLinksListGet, MediaLinksListGet, StationListGet, DamagedZonesListGet, RasterDataListGet, VectorDataListGet, RemoteSensingDataListGet, MultimediaRecordsDataListGet, OldEventDataGet} from './request_functions.js'


var moment = require('moment');
moment().format();

const useStyles = makeStyles(theme => ({
fullwidth:{
  width: '100%',
  display: 'flex',
  justifyContent:"center",
},
textfield:{
    width: '30%', 
    margin: '3vh 1% 0',

  },
textfield2:{
    width: '30%', 
    margin: '3vh 1% 0',
    display: 'inline-block',
},
textfield3:{
    width: '45%', 
    margin: '3vh 1% 0',
    display: 'inline-block',
},
textfieldLg:{
    width: '62%', 
    margin: '3vh 1% 0',

  },
  empStr:{
    width: '100%', 
    height: '5vh',

  },

  halfField:{
    width: '48%',
    margin: '0 1%',
    float: 'left',
  },
  halfField2:{
    width: '45%',
    margin: '0 1%',
    float: 'right',
  },
  mediumField:{
    width:'60%',
    margin: '0 1%',
    float: 'left,'
  },

  root: {
    margin: '3vh 2%',
    padding: '1%',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  btn: {
    background: '#1D8A6B',
    float: 'left',
  },
  btn2: {
    background: '#ff333d',
    float: 'left',
  },
}
));



export default function NewEditMode(props) {

  
  const classes = useStyles();
  const [state, setState] = React.useState({
      place_id: props.placeId,
      type_id: '',
      type:'',
      reason_id: '',
      reason: '',
      name_rus: '',
      description_rus: '',
      name_eng: '',
      description_eng: '',
      cost_rub: '',
      area_km: '',
      max_depth: '',
      mean_depth: '',
      max_speed: '',
      mean_speed: '',
      event_start_date: null,
      event_end_date: null,
      common_links:[],
      media_links:[],
      observation_stations:[],
      damaged_zones:[],
      raster_data:[],
      vector_data:[],
      remote_sensing_data:[],
      multimedia_records_data:[],

      multimedia_records_data_list:null,
      remote_sensing_data_list:null,
      vector_data_list:null,
      raster_data_list:null,
      damaged_zones_list:null,
      stations_list:null,
      media_links_list: null,
      common_links_list: null,
      types_list: null,
      reasons_list:null,
      firstDataGet:false,

      dialog_box_value:null,
      eventPushResponse:null,
      waitingDialogOpen:false,
      fieldsFilled:true,

      });

    const eventJson = new FormData();
    eventJson.append('event_id', state.event_id)
    eventJson.append('place_id', state.place_id)
    eventJson.append('type_id', state.type_id)
    eventJson.append('type',state.type)
    eventJson.append('reason_id', state.reason_id)
    eventJson.append('reason', state.reason)
    eventJson.append('name_rus', state.name_rus)
    eventJson.append('name_rus', state.name_rus)
    eventJson.append('description_rus', state.description_rus)
    eventJson.append('name_eng', state.name_eng)
    eventJson.append('description_eng', state.description_eng)
    eventJson.append('cost_rub', state.cost_rub)
    eventJson.append('area_km', state.area_km)
    eventJson.append('max_depth', state.max_depth)
    eventJson.append('mean_depth', state.mean_depth)
    eventJson.append('max_speed', state.max_speed)
    eventJson.append('mean_speed', state.mean_speed)
    eventJson.append('event_start_date', moment(state.event_start_date).format("DDMMYYYYTHHmmss"))
    eventJson.append('event_end_date', moment(state.event_end_date).format("DDMMYYYYTHHmmss"))
    eventJson.append('common_links',JSON.stringify(state.common_links.map((st)=>{return st.id})))
    eventJson.append('media_links',JSON.stringify(state.media_links.map((st)=>{return st.id})))
    eventJson.append('observation_stations', JSON.stringify(state.observation_stations.map((st)=>{return st.id})))
    eventJson.append('damaged_zones',JSON.stringify(state.damaged_zones.map((st)=>{return st.id})))
    eventJson.append('misc_raster_data',JSON.stringify(state.raster_data.map((st)=>{return st.id})))
    eventJson.append('misc_vector_data',JSON.stringify(state.vector_data.map((st)=>{return st.id})))
    eventJson.append('remote_sensing_data',JSON.stringify(state.remote_sensing_data.map((st)=>{return st.id})))
    eventJson.append('multimedia_records',JSON.stringify(state.multimedia_records_data.map((st)=>{return st.id})))

    const sendEventData=()=>{
      if(state.place_id!==undefined&&state.type_id!==''&&state.type!==''&&state.reason_id!==''&&state.reason!==''&&state.name_rus!==''&&state.description_rus!==''&&state.name_eng!==''&&state.description_eng!==''&&state.cost_rub!==''&&state.area_km!==''&&state.max_depth!==''&&state.mean_depth!==''&&state.max_speed!==''&&state.mean_speed!==''&&state.event_start_date!==null&&state.event_end_date!==null&&state.observation_stations!==[]){
        setState({...state, waitingDialogOpen: true})
        if (props.mode=='new'){
          postNewEventData(eventJson, props.login, props.password).then(data=>{console.log(data); setState({...state, eventPushResponse:data,
                                                                   waitingDialogOpen: true})})
        }
        if (props.mode=='old'){
          rewriteEventData(eventJson, props.login, props.password).then(data=>setState({...state, eventPushResponse:data,
                                                                   waitingDialogOpen: true}))
        }
      }
      else{
        setState({...state, fieldsFilled: false})
      }
    }
    const returnFilledFieldsError=()=>{
      if (state.fieldsFilled==false){
        console.log(state)
        return         <Typography color='error' align='center' gutterBottom>
                         Заполните все обязательные поля! (Помечены*)
                       </Typography>
      }
    }
    const returnServerResponse=()=>{
      if (state.eventPushResponse==null){
        return <DialogContent >
                    <div style={{display: 'flex', justifyContent:"center"}}>
                    <CircularProgress style={{color: green[500]}}/>
                    </div>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Идет отправка, подождите ответа от сервера...
                    </DialogContentText>
                  </DialogContent>
      }
      if (state.eventPushResponse!==null){
        if (state.eventPushResponse.status=='ok'){
          return <div>
                      
                      <DialogContent >
                      <div style={{display: 'flex', justifyContent:"center"}}>
                      <CloudDoneIcon style={{ color: green[500], fontSize: 40}}/>
                      </div>
                        <DialogContentText color="inherit" align='center' gutterBottom>
                          Данные о событии успешно добавлены!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions> 
                        <Button onClick={()=>setState({...state, waitingDialogOpen:false})}>Закрыть</Button>
                      </DialogActions>
                 </div>
        }
        if (state.eventPushResponse.status!=='ok'){
          return <div>
                      
                      <DialogContent>
                      <div style={{display: 'flex', justifyContent:"center"}}>
                      <CancelIcon style={{ color: red[500], fontSize: 40}}/>
                      </div>
                        <DialogContentText color="inherit" align='center' gutterBottom>
                          Ошибка при добавлении данных!
                        </DialogContentText>
                        <DialogContentText color="inherit" align='center' gutterBottom>
                          Log: {state.eventPushResponse.comment}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions> 
                      <Button onClick={()=>setState({...state, waitingDialogOpen:false})}>Закрыть</Button>
                      </DialogActions>
                 </div>
        }
      }
    }
    if (state.firstDataGet==false){
      if (props.mode=='old'){
      console.log(props.eventId)
            const list={}
            const pl_id=props.placeId
            console.log(pl_id)
            TypesListGet().then(data=>list.types_list=data).then(ReasonsListGet().then(data=>list.reasons_list=(data))
                                                      .then(CommonLinksListGet().then(data=>list.common_links_list=(data))
                                                      .then(MediaLinksListGet().then(data=>list.media_links_list=(data))
                                                      .then(StationListGet().then(data=>list.stations_list=(data))
                                                      .then(DamagedZonesListGet().then(data=>list.damaged_zones_list=(data))
                                                      .then(RasterDataListGet().then(data=>list.raster_data_list=(data))
                                                      .then(VectorDataListGet().then(data=>list.vector_data_list=(data))
                                                      .then(RemoteSensingDataListGet().then(data=>list.remote_sensing_data_list=(data))
                                                      .then(MultimediaRecordsDataListGet().then(data=>list.multimedia_records_data_list=(data))
                                                      .then(OldEventDataGet(props.eventId).then(data=>{console.log(data);list.event_info=(data)})

                                                      .then(data=>{console.log(list);setState({...state, firstDataGet:true,
                                                                                types_list:list.types_list,
                                                                                reasons_list:list.reasons_list,
                                                                                common_links_list:list.common_links_list,
                                                                                media_links_list:list.media_links_list,
                                                                                stations_list:list.stations_list,
                                                                                damaged_zones_list:list.damaged_zones_list,
                                                                                raster_data_list:list.raster_data_list,
                                                                                vector_data_list:list.vector_data_list,
                                                                                remote_sensing_data_list:list.remote_sensing_data_list,
                                                                                multimedia_records_data_list:list.multimedia_records_data_list,
                                                                                event_id:list.event_info.data.events[0].id,
                                                                                name_rus:list.event_info.data.events[0].name_rus,
                                                                                name_eng:list.event_info.data.events[0].name_eng,
                                                                                place_id: pl_id,
                                                                                type_id:list.event_info.data.events[0].type_id,
                                                                                type:list.event_info.data.events[0].type,
                                                                                reason_id:list.event_info.data.events[0].reason_id,
                                                                                reason:list.event_info.data.events[0].reason,
                                                                                cost_rub:list.event_info.data.events[0].cost_rub,
                                                                                area_km:list.event_info.data.events[0].area_km,
                                                                                max_depth:list.event_info.data.events[0].max_depth,
                                                                                mean_depth:list.event_info.data.events[0].mean_depth,
                                                                                max_speed:list.event_info.data.events[0].max_speed,
                                                                                mean_speed:list.event_info.data.events[0].mean_speed,
                                                                                event_start_date:moment(list.event_info.data.events[0].event_start_date, 'DDMMYYYYTHHmmss').format('YYYY/MM/DD HH:mm'),
                                                                                event_end_date:moment(list.event_info.data.events[0].event_end_date, 'DDMMYYYYTHHmmss').format('YYYY/MM/DD HH:mm'),
                                                                                observation_stations:list.event_info.data.events[0].observation_stations,
                                                                                common_links:list.event_info.data.events[0].common_links,
                                                                                media_links:list.event_info.data.events[0].media_links,
                                                                                damaged_zones:list.event_info.data.events[0].damaged_zones,
                                                                                raster_data:list.event_info.data.events[0].misc_raster_data,
                                                                                vector_data:list.event_info.data.events[0].misc_vector_data,
                                                                                remote_sensing_data:list.event_info.data.events[0].remote_sensing_data,
                                                                                multimedia_records_data:list.event_info.data.events[0].multimedia_records,
                                                                                description_eng:list.event_info.data.events[0].description_eng,
                                                                                description_rus:list.event_info.data.events[0].description_rus,
                                                                              })})
                                                      .then(console.log(state)))))))))))) 
    }
      if (props.mode=='new'){
     
            const list=[]
            TypesListGet().then(data=>list.push(data)).then(ReasonsListGet().then(data=>list.push(data))
                                                      .then(CommonLinksListGet().then(data=>list.push(data))
                                                      .then(MediaLinksListGet().then(data=>list.push(data))
                                                      .then(StationListGet().then(data=>list.push(data))
                                                      .then(DamagedZonesListGet().then(data=>list.push(data))
                                                      .then(RasterDataListGet().then(data=>list.push(data))
                                                      .then(VectorDataListGet().then(data=>list.push(data))
                                                      .then(RemoteSensingDataListGet().then(data=>list.push(data))
                                                      .then(MultimediaRecordsDataListGet().then(data=>list.push(data))
                                                      .then(data=>setState({...state, firstDataGet:true,
                                                                                types_list:list[0],
                                                                                reasons_list:list[1],
                                                                                common_links_list:list[2],
                                                                                media_links_list:list[3],
                                                                                stations_list:list[4],
                                                                                damaged_zones_list:list[5],
                                                                                raster_data_list:list[6],
                                                                                vector_data_list:list[7],
                                                                                remote_sensing_data_list:list[8],
                                                                                multimedia_records_data_list:list[9]}))
                                                      .then(console.log(state)))))))))))
               
          }
        }


  const handleStartDateChange = date => {
    setState({...state, event_start_date: date});
  };
  const handleEndDateChange = date => {
    setState({...state, event_end_date: date});
  };

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
    const set_reason=(event)=>{
      const id=event.target.value
      state.reasons_list.data.reasons.forEach(element=>{
        if (id==element.id){
          const reason=element.reason
          setState({ ...state, reason_id: event.target.value,
                           reason: reason});
        }}
      )
      
  }
    const set_name_rus=(event)=>{
      setState({ ...state, name_rus: event.target.value });
  }
    const set_description_rus=(event)=>{
      setState({ ...state, description_rus: event.target.value });
  }
    const set_cost_rub=(event)=>{
      setState({ ...state, cost_rub: event.target.value });
  }
    const set_area_km=(event)=>{
      setState({ ...state, area_km: event.target.value });
  }
    const set_max_depth=(event)=>{
      setState({ ...state, max_depth: event.target.value });
  }
    const set_mean_depth=(event)=>{
      setState({ ...state, mean_depth: event.target.value });
  }

    const set_max_speed=(event)=>{
      setState({ ...state, max_speed: event.target.value });
  }
    const set_mean_speed=(event)=>{
      setState({ ...state, mean_speed: event.target.value });
  }
    const set_name_eng=(event)=>{
      setState({ ...state, name_eng: event.target.value });
  }
    const set_description_eng=(event)=>{
      setState({ ...state, description_eng: event.target.value });
  }
  
    const returnDialogContent=()=>{
      if (state.dialog_box_value=='common_links'){
        return <AdminCommonLinksBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='media_links'){
        return <AdminMediaLinksBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='damaged_zones'){
        return <AdminDamagedZonesBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='raster_data'){
        return <AdminRasterDataBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='vector_data'){
        return <AdminVectorDataBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='remote_sensing_data'){
        return <AdminRemoteSensingDataBlock login={props.login} password={props.password} closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
      if (state.dialog_box_value=='multimedia_records_data'){
        return <AdminMultimediaRecordsDataBlock login={props.login} password={props.password}closeDialog={(dataType)=>closeDialog(dataType)}/>
      }
    }
    const openCommonLinksDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'common_links'});
    }
    const openMediaLinksDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'media_links'});
    }
    const openDamageZonesDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'damaged_zones'});
    }
    const openRasterDataDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'raster_data'});
    }
    const openVectorDataDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'vector_data'});
    }
    const openRemoteSensingDataDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'remote_sensing_data'});
    }
    const openMultimediaRecordsDataDialog=()=>{
      setState({ ...state, openDialog: true,
                           dialog_box_value: 'multimedia_records_data'});
    }
    const closeDialog=(dataType)=>{
      if (dataType=='common_links_list'){

        CommonLinksListGet().then(data=>setState({...state, common_links_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='media_links_list'){

        MediaLinksListGet().then(data=>setState({...state, media_links_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='damaged_zones_list'){

        DamagedZonesListGet().then(data=>setState({...state, damaged_zones_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='raster_data_list'){

        RasterDataListGet().then(data=>setState({...state, raster_data_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='vector_data_list'){

        VectorDataListGet().then(data=>setState({...state, vector_data_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='remote_sensing_data_list'){

        RemoteSensingDataListGet().then(data=>setState({...state, remote_sensing_data_list:data,
                                                            openDialog: false}))
      }
      if (dataType=='multimedia_records_data_list'){

        MultimediaRecordsDataListGet().then(data=>setState({...state, multimedia_records_data_list:data,
                                                            openDialog: false}))
      }
      else{
        setState({ ...state, openDialog: false})
      }
    }

    const setCommonLinks=(event,value)=>{
        setState({ ...state, common_links:value})
        console.log(state)
    }
    const setMediaLinks=(event,value)=>{
        setState({ ...state, media_links:value})
        console.log(state)
    }
    const setStationsList=(event,value)=>{
        setState({ ...state, observation_stations:value})
        console.log(state)
    }
    const setDamagedZones=(event,value)=>{
        setState({ ...state, damaged_zones:value})
        console.log(state)
    }
    const setRasterData=(event,value)=>{
        setState({ ...state, raster_data:value})
        console.log(state)
    }
    const setVectorData=(event,value)=>{
        setState({ ...state, vector_data:value})
        console.log(state)
    }
    const setRemoteSensingData=(event,value)=>{
        setState({ ...state, remote_sensing_data:value})
        console.log(state)
    }
    const setMultimediaRecordsData=(event,value)=>{
        setState({ ...state, multimedia_records_data:value})
        console.log(state)
    }
const returnMenuItemsReason = () =>{
    const list = []
    if (state.reasons_list!=null&&state.reasons_list!==undefined){
      const reasons_list= state.reasons_list.data.reasons      
      for (let i=0; i<reasons_list.length; i++){
              list.push(<MenuItem key={i} value={reasons_list[i].id}>{reasons_list[i].alias_rus}</MenuItem>)
      
      }
  }
    return list
  }
  const returnMenuItemsTypes = () =>{
    const list = []
    if (state.types_list!=null&&state.types_list!==undefined){
      const types_list= state.types_list.data.types      
      for (let i=0; i<types_list.length; i++){
              list.push(<MenuItem key={i} value={types_list[i].id}>{types_list[i].alias_rus}</MenuItem>)
      
      }
  }
    return list
  }
  
  const returnCommonLinksAutoc=()=>{
    if (state.common_links_list!==null&&state.common_links_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Вспомогательные ссылки:
         </Typography>
          <Autocomplete            
            defaultValue={state.common_links}
            noOptionsText='Нет совпадений'
            options={state.common_links_list.data.common_links}
            getOptionLabel={option => option.name_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setCommonLinks(event,value)}
            renderInput={params => (
              <TextField {...params} variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимой ссылки нет в списке добавьте ее, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openCommonLinksDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }
  const returnMediaLinksAutoc=()=>{
    if (state.media_links_list!==null&&state.media_links_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Ссылки на новости:
         </Typography>
          <Autocomplete                       
            defaultValue={state.media_links}
            noOptionsText='Нет совпадений'
            options={state.media_links_list.data.media_links}
            getOptionLabel={option => option.name_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setMediaLinks(event,value)}
            renderInput={params => (
              <TextField {...params} variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимой ссылки нет в списке добавьте ее, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openMediaLinksDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }
  const returnStationsAutoc=()=>{
    if (state.stations_list!==null&&state.stations_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Станции наблюдения вблизи местa*
         </Typography>
     <Autocomplete  
            defaultValue={state.observation_stations}                  
            multiple
            noOptionsText='Нет совпадений'
            options={state.stations_list.data.stations}
            getOptionLabel={option => option.id.toString()}
            onChange={(event,value)=>setStationsList(event,value)}
            renderInput={params => (
              <TextField {...params} label='Id станции' variant="standard" fullWidth />
          )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Список станций наблюдения доступен во вкладке "Станции наблюдения" основной страницы
         </Typography> 
          </div>)
    }
    
  }
  const returnDamagedZonesAutoc=()=>{
    if (state.damaged_zones_list!==null&&state.damaged_zones_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Поврежденные территории:
         </Typography>
          <Autocomplete                       
            defaultValue={state.damaged_zones} 
            noOptionsText='Нет совпадений'
            options={state.damaged_zones_list.data.damaged_zones}
            getOptionLabel={option => option.description_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setDamagedZones(event,value)}
            renderInput={params => (
              <TextField {...params} label='Описание зоны' variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимой зоны нет в списке добавьте ее, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openDamageZonesDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }
  const returnRasterDataAutoc=()=>{
    if (state.raster_data_list!==null&&state.raster_data_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Растровые данные:
         </Typography>
          <Autocomplete                       
            defaultValue={state.raster_data} 
            noOptionsText='Нет совпадений'
            options={state.raster_data_list.data.misc_raster_data}
            getOptionLabel={option => option.name_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setRasterData(event,value)}
            renderInput={params => (
              <TextField {...params} label='Название изображения' variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимого изображения нет в списке добавьте его, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openRasterDataDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }

  const returnVectorDataAutoc=()=>{
    if (state.vector_data_list!==null&&state.vector_data_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Векторные данные:
         </Typography>
          <Autocomplete                       
            defaultValue={state.vector_data} 
            noOptionsText='Нет совпадений'
            options={state.vector_data_list.data.misc_vector_data}
            getOptionLabel={option => option.name_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setVectorData(event,value)}
            renderInput={params => (
              <TextField {...params} label='Название векторного слоя' variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимого векторного слоя нет в списке добавьте его, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openVectorDataDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }

  const returnRemoteSensingDataAutoc=()=>{
    if (state.remote_sensing_data_list!==null&&state.remote_sensing_data_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Данные дистанционного зондирования:
         </Typography>
          <Autocomplete                       
            defaultValue={state.remote_sensing_data} 
            noOptionsText='Нет совпадений'
            options={state.remote_sensing_data_list.data.remote_sensing_data}
            getOptionLabel={option => option.description_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setRemoteSensingData(event,value)}
            renderInput={params => (
              <TextField {...params} label='Описание снимка' variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимого снимка нет в списке добавьте его, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openRemoteSensingDataDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }

  const returnMultimediaRecordsDataAutoc=()=>{
    if (state.multimedia_records_data_list!==null&&state.multimedia_records_data_list!==undefined){
        return (
        <div className={classes.textfield3}>
        <Typography align='center' gutterBottom>
            Мультимедийные элементы:
         </Typography>
          <Autocomplete                       
            defaultValue={state.multimedia_records_data} 
            noOptionsText='Нет совпадений'
            options={state.multimedia_records_data_list.data.multimedia_records}
            getOptionLabel={option => option.name_rus}            
            multiple
            autoHighlight={true}
            onChange={(event,value)=>setMultimediaRecordsData(event,value)}
            renderInput={params => (
              <TextField {...params} label='Название файла' variant="standard" fullWidth />
            )}
          />
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимого элемента нет в списке добавьте его, заполнив форму, и после выберите из списка
         </Typography>
         <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                        onClick={()=>openMultimediaRecordsDataDialog()} 
              >Добавить</Button> 
          </div>)
    }
    
  }
  return (
    <Paper className={classes.root} >
    
    
    <Typography style={{width:"70%", float: 'left'}} align='center' gutterBottom>
            Чтобы добавить информацию о новом собылии, в пункте {props.placeName} заполните все обязательные (*) поля
     </Typography>
     <Button variant="outlined"  size="small"  onClick={()=>props.setNullChoise()}  style={{width:"20%", float: 'right'}}                 
     >Вернуться </Button>
     <div className={classes.empStr}></div> 
    <form className="uploader" encType="multipart/form-data">
          <TextField className={classes.textfield} id="name_rus" onChange={(event)=>set_name_rus(event)} value={state.name_rus} label="Название события (рус.)*" />
          <TextField className={classes.textfieldLg} id="description_rus" onChange={(event)=>set_description_rus(event)} value={state.description_rus} label="Описание события (рус.)*" />          
          <TextField className={classes.textfield} id="name_eng" onChange={(event)=>set_name_eng(event)} value={state.name_eng} label="Название события (англ.)*" />
          <TextField className={classes.textfieldLg} id="description_eng" onChange={(event)=>set_description_eng(event)} value={state.description_eng} label="Описание события (англ.)*" />
          <div className={classes.empStr}></div> 
          <Divider /> 

          <div className={classes.textfield2}>
          <InputLabel>Тип события*</InputLabel>
            <Select 
              style={{width:'100%'}}
              value={state.type_id}
              onChange={(event)=>set_type(event)}>
              {returnMenuItemsTypes()}
            </Select> 
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимого типа нет в списке, добавить его можно во вкладке "Типы/причины событий" основной страницы
         </Typography>  
          </div>

          <div className={classes.textfield2}> 
          <InputLabel>Причина события*</InputLabel>
            <Select 
              style={{width:'100%'}}            
              value={state.reason_id}
              onChange={(event)=>set_reason(event)}>
              {returnMenuItemsReason()}
            </Select>
          <Typography align='center' style={{color: '#999999', fontSize:'small'}} gutterBottom>
            Если необходимой причины нет в списке, добавить ее можно во вкладке "Типы/причины событий" основной страницы
         </Typography>
          </div>
          <div className={classes.textfield}></div>
          <Divider />
          <TextField className={classes.textfield} id="cost_rub" onChange={(event)=>set_cost_rub(event)} value={state.cost_rub} label="Ущерб (руб.)*" type="number"/>
          <TextField className={classes.textfield} id="area_km" onChange={(event)=>set_area_km(event)} value={state.area_km} label="Затронутая территория (км)*" type="number"/>
          <TextField className={classes.textfield} id="max_speed" onChange={(event)=>set_max_speed(event)} value={state.max_speed} label="Максимальная скорость*" type="number" />
          <TextField className={classes.textfield} id="mean_speed" onChange={(event)=>set_mean_speed(event)} value={state.mean_speed} label="Средняя скорость*" type="number" />
          <TextField className={classes.textfield} id="max_depth" onChange={(event)=>set_max_depth(event)} value={state.max_depth} label="Максимальная глубина*" type="number"/>
          <TextField className={classes.textfield} id="mean_depth" onChange={(event)=>set_mean_depth(event)} value={state.mean_depth} label="Средняя глубина*" type="number"/>
          <div className={classes.textfield}></div>
          <div className={classes.empStr}></div>
          <Divider />
          
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <div className={classes.textfield2}>
                    <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={state.event_start_date}
                  onChange={handleStartDateChange}
                  label="Дата и время начала события*"
                  format="yyyy/MM/dd HH:mm"
                />
                 </div>

          </MuiPickersUtilsProvider>          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
              <div className={classes.textfield2}>
                    <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={state.event_end_date}
                  onChange={handleEndDateChange}
                  label="Дата и время окончания события*"
                  format="yyyy/MM/dd HH:mm"
                />
                 </div>             
          </MuiPickersUtilsProvider>

          <div className={classes.empStr}></div>
          <Divider />

          {returnStationsAutoc()}

          <div className={classes.empStr}></div>
          <Divider />
          
          {returnCommonLinksAutoc ()}
          {returnMediaLinksAutoc ()}
          
          <Dialog
                  open={state.openDialog}
                  onClose={()=>closeDialog('empty')}>
                  <DialogContent>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Заполните данные
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>

                    {returnDialogContent()}
                    
                  </DialogActions>
             </Dialog>

          <div className={classes.empStr}></div>
          <Divider />
          
          {returnDamagedZonesAutoc()}
          {returnRasterDataAutoc()}

          <div className={classes.empStr}></div>
          <Divider />

          {returnVectorDataAutoc()}
          {returnRemoteSensingDataAutoc()}

          <div className={classes.empStr}></div>
          <Divider />

          {returnMultimediaRecordsDataAutoc()}

          <div className={classes.empStr}></div>
          
          {returnFilledFieldsError()}
          <div className={classes.fullwidth}>

          <Button variant="contained" color="secondary" size="large" endIcon={<CloudUploadIcon />} onClick={()=>sendEventData()} 
          >Отправить форму</Button> 
              <Dialog open={state.waitingDialogOpen}>
                  {returnServerResponse()}
              </Dialog>
          </div>
    </form>
    </Paper>
  );
}


