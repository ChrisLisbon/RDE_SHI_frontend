import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';

import StationsTableDownload from './StationsTableDownload.js'
import HydroObsTableDownload from './HydroObsTableDownload.js'
import MeteoObsTableDownload from './MeteoObsTableDownload.js'

import {OldEventDataGet} from './request_functions.js'

export default function DownloadFilesComponent(props) {
  const [state, setState] = React.useState({
      firstDataGetState: false,
      
      });
  
	
const event_name=()=>{
		console.log(state.eventData)
		if (state.eventData!==undefined){
			return state.eventData.name_rus
		}
		else {
			return ' '
		}
		
	}

const returnCards=()=>{
	if (state.eventData==undefined){
			return <div>
                    <div style={{display: 'flex', justifyContent:"center", margin: '30vh 0 0'}}>
                    <CircularProgress style={{color: green[500]}}/>
                    </div>
                    <Typography color="inherit" align='center' gutterBottom>
                      Загрузка данных...
                    </Typography>
                  </div>
		}
		else {
			return <div style={{width: '100%'}}>
						{returnMultimediaList()}
						{returnMiscRasterDataList()}
						{returnMiscVectorDataList()}
						{returnRemoteSensingDataList()}
						<div style={{margin:'1vh 4%', width: '92%', }}>
							<StationsTableDownload stations={state.eventData.observation_stations}/>
						</div>
						{returnHydroTable()}
						{returnMeteoTable()}
				   </div>
		}
}

const returnHydroTable=()=>{
	if (state.eventData.hydro_observations.length!==0){
		return <div style={{margin:'1vh 4%', width: '92%', }}>
					<HydroObsTableDownload observations={state.eventData.hydro_observations}/>
				</div>
	}
}
const returnMeteoTable=()=>{
	if (state.eventData.meteo_observations.length!==0){
		return <div style={{margin:'1vh 4%', width: '92%', }}>
					<MeteoObsTableDownload observations={state.eventData.meteo_observations}/>
				</div>
	}
}

const returnMultimediaList=()=>{
	
			if (state.eventData.multimedia_records.length!==0){
				const multimedia_records_l=state.eventData.multimedia_records.map((info)=>{
					return {name_rus: info.name_rus,
							link: info.file}
				})

				 const al=multimedia_records_l.map((el)=>{
				 	const link='http://'+el.link
				 	return <div style={{margin: '1vh 0 0 0'}}>
				 			<Typography ><b>Название:</b></Typography>
				 			<Typography >{el.name_rus}</Typography>
				 			 <Link href={link} target='_blank' variant="body2">{'Скачать'}</Link>
				 			</div>
				 })
				 return <div style={{margin:'1vh 5%', width: '90%', padding:'1%'}}>
				 			<Typography align='center'>Мультимедийные объекты</Typography>
				 			{al}
				 		</div>
		}
}

const returnMiscVectorDataList=()=>{
	
			if (state.eventData.misc_vector_data.length!==0){
				const misc_vector_data_l=state.eventData.misc_vector_data.map((info)=>{
					return {name_rus: info.name_rus,
							link: info.file}
				})

				 const al=misc_vector_data_l.map((el)=>{
				 	const link='http://'+el.link
				 	return 	<div style={{margin: '1vh 0 0 0'}}>
				 			<Typography ><b>Название:</b></Typography>
				 			<Typography >{el.name_rus}</Typography>
				 			<Link href={link} target='_blank' variant="body2">{'Скачать'}</Link>
				 			</div>
				 })
				 return <div style={{margin:'1vh 5%', width: '90%', padding:'1%'}}>
				 			<Typography align='center'>Векторные данные</Typography>
				 			{al}
				 		</div>
		}
}

const returnMiscRasterDataList=()=>{
			
			if (state.eventData.misc_raster_data.length!==0){
				console.log(state.eventData)
				const misc_raster_data_l=state.eventData.misc_raster_data.map((info)=>{
					return {name_rus: info.name_rus,
							link: info.file}
				})

				 const al=misc_raster_data_l.map((el)=>{
				 	const link='http://'+el.link
				 	return 	<div style={{margin: '1vh 0 0 0'}}>
				 			<Typography ><b>Название:</b></Typography>
				 			<Typography >{el.name_rus}</Typography>
				 			<Link href={link} target='_blank' variant="body2">{'Скачать'}</Link>
				 			</div>
				 })
				 return <div style={{margin:'1vh 5%', width: '90%', padding:'1%'}}>
				 			<Typography align='center'>Растровые данные</Typography>
				 			{al}
				 		</div>
		}
}

const returnRemoteSensingDataList=()=>{
	
			if (state.eventData.remote_sensing_data.length!==0){
				const remote_sensing_data_l=state.eventData.remote_sensing_data.map((info)=>{
					return {description_rus: info.description_rus,
							link: info.file}
				})

				 const al=remote_sensing_data_l.map((el)=>{
				 	const link='http://'+el.link
				 	return 	<div style={{margin: '1vh 0 0 0'}}>
				 			<Typography ><b>Название:</b></Typography>
				 			<Typography >{el.description_rus}</Typography>
				 			<Link href={link} target='_blank' variant="body2">{'Скачать'}</Link>
				 			</div>
				 })
				 return <div style={{margin:'1vh 5%', width: '90%', padding:'1%'}}>
				 			<Typography align='center'>Данные дистанционного зондирования</Typography>
				 			{al}
				 		</div>
		}
}

if (state.firstDataGetState==false){
			var path= window.location.href
			var event_id=path.split('#')[1]
			OldEventDataGet(event_id).then(data=>
						setState({...state, eventData: data.data.events[0],
							    					   firstDataGetState: true}))	
			
}
document.title = 'Скачать данные|Опасные гидрологические явления';
  return (
    <div>
    <Paper elevation={5} style={{margin: '3vh 15vw', height: '94vh', width: '70vw', overflow:'auto', maxHeight:'94vh'}}>
    <Typography  variant='h5' align='center'>
    	Файлы для события: {event_name()}
    </Typography>
    
    {returnCards()}
    </Paper>

    </div>
  );
}