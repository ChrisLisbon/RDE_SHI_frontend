import {API_settings} from './server_settings.js'


async function OldEventDataGet(event_id)
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events?event_id=['+ event_id+']');
        let data = await response.json()
        return data
        
      };

async function EventsForPlaceGet(place_id)
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events?places_id=['+ place_id+']');
        let data = await response.json()
        return data
        
      };

async function placesListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/places');
        let data = await response.json()
        
        return data
        
      }

async function TypesListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events/types');
        let data = await response.json()
        
        return data
        
      }
async function ReasonsListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events/reasons');
        let data = await response.json()
        
        return data
        
      }

async function CommonLinksListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/common_links');
        let data = await response.json()
        return data
        
      }

async function MediaLinksListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/media_links');
        let data = await response.json()
        
        return data
        
      }

async function StationListGet(type){
	if (type==undefined)
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/observation_stations');
        let data = await response.json()
        
        return data
        
      }
    if (type!==undefined)
    {
      	console.log('not und')
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/observation_stations?type_id=['+type+']');
        let data = await response.json()
        
        return data
        
      }
    }
async function DamagedZonesListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/damaged_zones');
        let data = await response.json()
        
        return data
        
      }

async function DamagedZonesTypesGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/damaged_zones/types');
        let data = await response.json()
        
        return data
        
      }

async function RasterDataListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/misc_raster_data');
        let data = await response.json()
        
        return data
        
      }

async function VectorDataListGet(id){
    if (id==undefined)
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/misc_vector_data');
        let data = await response.json()
        
        return data
        
      }
    if (id!==undefined)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/misc_vector_data?id=['+id+']');
        let data = await response.json()
        
        return data
        
      }
    }
async function RemoteSensingDataListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/remote_sensing_data');
        let data = await response.json()
        
        return data
        
      }

async function MultimediaRecordsDataListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/multimedia_records');
        let data = await response.json()
        
        return data
        
      }

async function MultimediaRecordsTypesListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/multimedia_records/types');
        let data = await response.json()
        
        return data
        
      }

async function ObservationStationsTypesListGet()
    {
      
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/observation_stations/types');
        let data = await response.json()
        console.log(data)
        return data
        
        
      }

async function getAccess(login, password)
		{
			
		let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/authorization', {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(login+':'+password)

        },
        redirect: 'follow',
        referrer: 'no-referrer',

    });
				let data = await response.json()
				return data
				
			}

async function postNewEventData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events', {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function rewriteEventData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events/overwrite', {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: form,
    });
        let data = await response.json()
        return data
        
      }

async function postCommonLink(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/common_links', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: form,
    });
        let data = await response.json()
        return data
        
      }

async function postMediaLink(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/media_links', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: form,
    });
        let data = await response.json()
        return data
        
      }

async function postDamagedZone(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/damaged_zones', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postRasterData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/misc_raster_data', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postVectorData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/misc_vector_data', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postRemoteSensingData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/remote_sensing_data', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postMultimediaRecordsData(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/multimedia_records', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewPlace(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/places', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewReason(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events/reasons', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewType(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events/types', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewStation(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/observation_stations', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewHydroObservation(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/hydro_observations', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

async function postNewMeteoObservation(form, login, password)
    {
        let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/meteo_observations', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
        	'Authorization': 'Basic ' + btoa(login+':'+password)
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: form, 
    });
        let data = await response.json()
        return data
        
      }

export {postMultimediaRecordsData, postRemoteSensingData, postVectorData, postRasterData,
		postMediaLink, postCommonLink, rewriteEventData, postNewEventData, getAccess,
		postNewPlace, postNewReason, postNewType, postNewStation, 
		postNewHydroObservation, postNewMeteoObservation,
		EventsForPlaceGet, MultimediaRecordsTypesListGet, placesListGet,
		ObservationStationsTypesListGet,
	    MultimediaRecordsDataListGet, RemoteSensingDataListGet, VectorDataListGet, 
		RasterDataListGet, DamagedZonesListGet, StationListGet, MediaLinksListGet,
		CommonLinksListGet, ReasonsListGet, TypesListGet, OldEventDataGet, postDamagedZone,
		DamagedZonesTypesGet}