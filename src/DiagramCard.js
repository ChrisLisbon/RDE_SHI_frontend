import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Diagram from './DiagramNew.js'
import SimpleSelect from './SelectDiagramHeader.js'
import EventInfoText from './EventInfoText'
import ThemeProvider  from '@material-ui/styles/ThemeProvider';
import ZeroPadding from './ZeroPadding.js'
import EventObservationsTable from './EventObservationsTable.js'
import InfoPopover from './InfoPopover.js'
import {font_size} from './system_functions.js'

var moment = require('moment');
moment().format();


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography 
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bar:{
    backgroundColor:'#1D8A6B',
    minHeight: 0,

  },
  bar2:{
    backgroundColor:'#1D8A6B',
    minHeight: 0,

  },
  barlabel:{
    minHeight: 0,
    width: '20%',
    minWidth:'50px'
  },
   label:{
    minHeight: 0,
  }
}));

export default function DiagramCard(props) {
  const stationId = props.clickedStationId
  const stationType = props.clickedStationType
  const eventData = props.eventData
  const vh = window.innerHeight;
  const tab_vh=(vh)=>{
    if (vh>=920){
      return '88%'
    }
    if (vh<920){
      const header_vh=64.4
      const f_tab_vh=(vh-64.4)/2
      console.log(f_tab_vh)
      console.log(f_tab_vh-51.336)
      return f_tab_vh-51.336
    }
  }
  const root_vh=(vh)=>{
    if (vh>=920){
      return '46.5vh'
    }
    if (vh<920){
      const header_vh=64.4
      const f_tab_vh=(vh-64.4)/2
      return f_tab_vh
    }
  }
  const dataStart=moment(eventData.event_start_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY')
  const dataEnd=moment(eventData.event_end_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY')

  const dangerValues=eventData.observation_stations.map((el)=>{
      if (el.id==stationId){
          return JSON.parse(el.danger_values)
      }
      else{
        return null
      }
  }).filter(Boolean)[0]


  const classes = useStyles();
  const [state, setState] = React.useState({
    value: 1 ,    
    newValueType: null

  }
    );
    
  const valueType = state.newValueType 


  const listLables = []
  const firstParameter = []
  const secondParameter = []
  const data ={}


  if (stationType == 'Гидропост'){  
     const sortedDict=eventData.hydro_observations.map((hydro_observations)=>{
        if (hydro_observations.hydro_gauge_id == stationId){
          return {"date":moment(hydro_observations.observation_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY HH:mm'),
                  "firstParameter":parseFloat(hydro_observations.water_discharge),
                  "secondParameter":parseFloat(hydro_observations.water_level)}
        }
        else{
          return null
        }
    }).filter(Boolean).sort(function(a,b){
            return moment(a.date, 'DD.MM.YYYY HH:mm') - moment(b.date, 'DD.MM.YYYY HH:mm');
})
    

    const listLables=sortedDict.map((el)=>{
      return el.date
    })
    const firstParameter=sortedDict.map((el)=>{
      return el.firstParameter
    })
    const secondParameter=sortedDict.map((el)=>{
      return el.secondParameter
    })
     
      

    if (valueType=='water_discharge'){

    data.listLables=listLables
    data.Parameter=firstParameter
    data.label='Расход воды, ед.из'
    data.dangerValues=dangerValues.water_discharge
  }
    if (valueType=='water_level'){

    data.listLables=listLables
    data.Parameter=secondParameter
    data.label='Уровень воды, м'
    data.dangerValues=dangerValues.water_level
  }
    if (valueType=='air_temperature'){

    data.listLables=[1]
    data.Parameter=[1]
    data.dangerValues=[]
  }
    if (valueType=='precipitations'){

    data.listLables=[1]
    data.Parameter=[1]   
    data.dangerValues=[]
  }
}   

     
    if (stationType == 'Метеостанция'){
    
    
const sortedDict=eventData.meteo_observations.map((meteo_observations)=>{

        if (meteo_observations.meteo_station_id == stationId){
          
          return {"date":moment(meteo_observations.observation_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY HH:mm'),
                  "firstParameter":parseFloat(meteo_observations.air_temperature),
                  "secondParameter":parseFloat(meteo_observations.precipitations)}
        }
        else{
          return null
        }
    }).filter(Boolean).sort(function(a,b){
            return moment(a.date, 'DD.MM.YYYY HH:mm') - moment(b.date, 'DD.MM.YYYY HH:mm');
})

    const listLables=sortedDict.map((el)=>{
      console.log('sortedDict')
      return el.date
    })
    const firstParameter=sortedDict.map((el)=>{
      return el.firstParameter
    })
    const secondParameter=sortedDict.map((el)=>{
      return el.secondParameter
    })

     
    if (valueType=='air_temperature'){        
          
          data.listLables=listLables
          data.Parameter=firstParameter
          data.label='Температура воздуха, С'
          data.dangerValues=dangerValues.air_temperature
  }
    if (valueType=='precipitations'){
          data.listLables=listLables
          data.Parameter=secondParameter
          data.label='Количество осадков, мм'
          data.dangerValues=dangerValues.precipitations
  }
    if (valueType=='water_discharge'){

 
    data.listLables=[1]
    data.Parameter=[1]
    data.dangerValues=[]

  }
    if (valueType=='water_level'){

    data.listLables=[1]
    data.Parameter=[1]
    data.dangerValues=[]
  }
}
  
  const setNewValueTypeAfterChangingStationType=()=>{
  if (stationType=='Гидропост'){
        
        if (valueType==null||valueType=='air_temperature'||valueType=='precipitations'){
          
          setState({...state, newValueType: 'water_discharge', });
        }
  }
  if (stationType=='Метеостанция'){
    
    if (valueType==null||valueType=='water_discharge'||valueType=='water_level'){
      
          setState({...state, newValueType: 'air_temperature'});
        }
  }
}
  
  const setValueType= (valueType)=>{  
    setState({...state, newValueType: valueType});
    
  }
  
  const handleChangeTabs = (event, newValue) => {
    setState({...state,value:newValue});
  };
  
  const returnTable=(stationType)=>{
    if (stationType=='Метеостанция'){
                            return <EventObservationsTable observations={eventData.meteo_observations} stationId={stationId} type='meteo'/>  
                            } 
        if (stationType=='Гидропост'){
                            return <EventObservationsTable observations={eventData.hydro_observations} stationId={stationId} type='hydro'/>  
                            } 
        
  }

  if (stationType!==null){
        if (props.flag==false){
      
      {props.setDrawerWidth()}
    }
  

    return (
    <div style={{height: root_vh(vh)}} className={classes.root}>
      <AppBar style={{height: font_size(vh, 5.58)}} className={classes.bar} position="static">
        
          <Tabs style={{height: font_size(vh, 5.58)}} className={classes.bar2} value={state.value} onChange={handleChangeTabs} indicatorColor="primary">
         <InfoPopover name={eventData.name_rus}
                         dataStart={dataStart}
                         dataEnd={dataEnd}
                         description={eventData.description_rus}
                         area={eventData.area_km}
                         cost={eventData.cost_rub}
                         maxDepth={eventData.max_depth}
                         meanDepth={eventData.mean_depth}
                         maxSpeed={eventData.max_speed}
                         meanSpeed={eventData.mean_speed}
                         reason={eventData.reason}/>
          
          <Tab style={{height: font_size(vh, 5.58)}} className={classes.barlabel}label={<span style={{ fontSize: font_size(vh, 1.5, 'text')}}>График</span>} {...a11yProps(1)} />
          <Tab style={{height: font_size(vh, 5.58)}} className={classes.barlabel}label={<span style={{ fontSize: font_size(vh, 1.5, 'text')}}>Таблица</span>} {...a11yProps(2)} />
          <Typography style={{fontSize: font_size(vh, 1.8, 'text'), height: font_size(vh, 5.58), paddingTop: font_size(vh, 1.39), paddingBottom: font_size(vh, 2.39)}} className={classes.label}  variant="body1" component="p">Выберите тип данных:</Typography>
          <SimpleSelect stationType = {stationType}  setValueType={(valueType)=>setValueType(valueType)} valueType={valueType} 
          setNewValueTypeAfterChangingStationType={()=>setNewValueTypeAfterChangingStationType()}/>
          
        </Tabs>
      </AppBar>

      <ThemeProvider theme={ZeroPadding}>
      <TabPanel style={{height: tab_vh(vh), maxHeight: tab_vh(vh)}} value={state.value} index={1}>
        <Diagram data = {data}/>
      </TabPanel>
      <TabPanel style={{height: tab_vh(vh), maxHeight: tab_vh(vh), overflow: 'auto'}} value={state.value} index={2}>  
        {returnTable(stationType)}
      </TabPanel>
      </ThemeProvider>  

    </div>
  );
  }
  if (stationType==null ){

    return(
    <EventInfoText name={eventData.name_rus}
                         dataStart={dataStart}
                         dataEnd={dataEnd}
                         description={eventData.description_rus}
                         area={eventData.area_km}
                         cost={eventData.cost_rub}
                         maxDepth={eventData.max_depth}
                         meanDepth={eventData.mean_depth}
                         maxSpeed={eventData.max_speed}
                         meanSpeed={eventData.mean_speed}
                         reason={eventData.reason}
                         margin='0 25%'
                         width='100%'/>)
  }
}