import MUIDataTable from "mui-datatables";
import React, {Component} from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {font_size} from './system_functions.js'
var moment = require('moment');
moment().format();


export default class EventObservationsTable extends Component{
  constructor(props){
    super(props)
    this.state = {
      propsData: null
    }
  }

  getMuiTheme = (vh) => createMuiTheme({
    overrides: {

        MUIDataTableHeadCell: {
          root: {
            color: "#a6a6a6",
            fontSize: font_size(vh, 1.5),
            minWidth:0,
            maxHeight:'7vh',
          padding:'1vh 0 1vh 1vw'
          }
        },
        MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF",
          minWidth:0,
          padding:'0.5vh 0 0.5vh 1vw',
          fontSize:font_size(vh, 1.5),
        }
      },
      MUIDataTableToolbar: {
          root: {
            height:'7vh',
            minHeight:'0vh',
            maxHeight:'7vh',
            minWidth:'0px'
          },
        },
      MUIDataTablePagination: {
          root: {
            
            height:'5vh',
            minHeight:'0vh',
            minWidth:0,
            padding:0,  
            overflow:'hidden'
          },
          toolbar : {
                height: '5vh',
                minHeight: 0,
                minWidth:0,
                padding:0
                
            }
        },


      MuiTypography: {
            h6: {
                fontSize: font_size(vh, 1.5),
            }
            , caption: {
                fontSize: font_size(vh, 1.5)
            },
            body2:{
              fontSize:font_size(vh, 1.5),
              margin:0
            }
        },
      MuiMenuItem: {
            root: {
                fontSize: font_size(vh, 1.5)
            }
        }
        , MuiChip: {
            label: {
                fontSize: font_size(vh, 1.5)
            }
        }
        , MuiInputLabel: {
            root: {
                fontSize: font_size(vh, 1.5)
            }
        }
        , MuiTooltip: {
            tooltip: {
                fontSize: font_size(vh, 1.5)
            }
        }
        , MuiInputBase: {
            input: {
                fontSize: font_size(vh, 1.5),
            }
        }



    }
  })

  getData=(pre_data, stationId, type)=>{
    var data=pre_data.map((el)=>{
      if (el.meteo_station_id == stationId){
        return el
      }
      else{
        return null
      }
    }).filter(Boolean)
    console.log(data)
    if (type=='meteo'){
        const new_data=data.map((el)=>{
          const newDate=moment(el.observation_date, 'DDMMYYYYTHHmmss').format('YYYY/MM/DD HH:mm')
          const air_temperature=el.air_temperature
          const id=el.id
          const meteo_station_id=el.meteo_station_id
          const precipitations=el.precipitations

          return {'air_temperature': air_temperature, 'id':id, 'observation_date':newDate, 'meteo_station_id': meteo_station_id, 'precipitations':precipitations}
        })
        return new_data
    }
    if (type=='hydro'){
        var data=pre_data.map((el)=>{
        if (el.hydro_gauge_id == stationId){
          return el
        }
        else{
          return null
        }
      }).filter(Boolean)
      const new_data=data.map((el)=>{
          const newDate=moment(el.observation_date, 'DDMMYYYYTHHmmss').format('YYYY/MM/DD HH:mm')
          const water_level=el.water_level
          const id=el.id
          const hydro_gauge_id=el.hydro_gauge_id
          const water_discharge=el.water_discharge

          return {'water_level': water_level, 'id':id, 'observation_date':newDate, 'hydro_gauge_id': hydro_gauge_id, 'water_discharge':water_discharge}
        })
        return new_data
    }
  }

  getColumns=(type, vh)=>{
    if (type=='meteo'){

      const columns = [
                       {
                      name: "meteo_station_id",
                      label: "ID метеостанции",
                      options: {
                       filter: true,
                       setCellProps: () => ({ style: { fontSize: font_size(vh, 1.5) } })
                      },

                     },
                     {
                      name: "observation_date",
                      label: "Дата",
                      options: {
                       filter: false,
                       setCellProps: () => ({ style: { fontSize: font_size(vh, 1.5) } })
                      },
                     },
                     {
                      name: "air_temperature",
                      label: "Температура воздуха, C",
                      options: {
                       filter: false,
                       setCellProps: () => ({ style: { fontSize: font_size(vh, 1.5) } })
                      },
                     },
                      {
                      name: "precipitations",
                      label: "Количество осадков, мм",
                      options: {
                       filter: false,
                       setCellProps: () => ({ style: { fontSize: font_size(vh, 1.5) } })
                      },
                     },
                     
                    ];
                    return columns
    }
    if (type=='hydro'){
      const columns = [
                       {
                      name: "hydro_gauge_id",
                      label: "ID метеостанции",
                      options: {
                       filter: true,

                      }
                     },
                     {
                      name: "observation_date",
                      label: "Дата",
                      options: {
                       filter: false,

                      }
                     },
                     {
                      name: "water_discharge",
                      label: "Расход воды (м)",
                      options: {
                       filter: false,

                      }
                     },
                      {
                      name: "water_level",
                      label: "Уровень воды (м)",
                      options: {
                       filter: false,

                      }
                     },
                     
                    ];
                    return columns
    }
    
  }

  getHeader=(type)=>{
    if (type=='meteo'){
      return 'Наблюдения метеостанций'
    }
    if (type=='hydro'){
      return 'Наблюдения гидропостов'
    }
  }

  render(){

const vh = window.innerHeight;
const columns=this.getColumns(this.props.type, vh) 

const placeNameHeader=this.getHeader(this.props.type)
const options = {
  filter:false,
  download: true,
  print: false,
  search: true,
  responsive: 'stacked',
  selectableRowsHeader: false,
  selectableRows: 'none',
  pagination:true,
  rowsPerPage:6,
  rowsPerPageOptions:[],
  textLabels: {
    body: {
      noMatch: "Совпадения не найдены",
    }},
  fixedHeader: true
};
  return(
    <MuiThemeProvider theme={this.getMuiTheme(vh)}>
        <MUIDataTable 
          title={placeNameHeader}
          data={this.getData(this.props.observations, this.props.stationId, this.props.type)}
          columns={columns}
          options={options}
        />
    </MuiThemeProvider>)
}}