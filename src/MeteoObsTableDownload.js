import MUIDataTable from "mui-datatables";
import React, {Component} from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
var moment = require('moment');
moment().format();


export default class MeteoObsTableDownload extends Component{
  constructor(props){
    super(props)
    this.state = {
      propsData: null
    }
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {

        MUIDataTableHeadCell: {
          root: {
            color: "#a6a6a6",
          }
        },

    }
  })

  getData=(data)=>{
    console.log(data)
    const new_data=data.map((el)=>{
      el.observation_date=moment(el.observation_date, 'DDMMYYYYTHHmmss').format('YYYY/MM/DD HH:mm')
      return el
    })
    return new_data
  }

  render(){



  const columns = [
   {
  name: "meteo_station_id",
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
  name: "air_temperature",
  label: "Температура воздуха, C",
  options: {
   filter: false,

  }
 },
  {
  name: "precipitations",
  label: "Количество осадков, мм",
  options: {
   filter: false,

  }
 },
 
];

const data = this.getData(this.props.observations)

const placeNameHeader='Наблюдения метеостанций'
const options = {
  filterType: 'dropdown',
  download: true,
  print: false,
  search: true,
  responsive: 'stacked',
  selectableRowsHeader: false,
  selectableRows: 'none',
  pagination:true,
  rowsPerPage:5,
  rowsPerPageOptions:[],
  textLabels: {
    body: {
      noMatch: "Совпадения не найдены",
    }},
  fixedHeader: true
};
  return(
    <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable 
          title={placeNameHeader}
          data={data}
          columns={columns}
          options={options}
        />
    </MuiThemeProvider>)
}}