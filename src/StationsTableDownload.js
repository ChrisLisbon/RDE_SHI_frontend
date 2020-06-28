import MUIDataTable from "mui-datatables";
import React, {Component} from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class StationsTableDownload extends Component{
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

  render(){

  const columns = [
   {
  name: "id",
  label: "ID",
  options: {
   filter: true,

  }
 },
 {
  name: "name_rus",
  label: "Название",
  options: {
   filter: false,

  }
 },
  {
  name: "description_rus",
  label: "Описание",
  options: {
   filter: false,

  }
 },
 {
  name: "type",
  label: "Тип",
  options: {
   filter: true,

  }
 },

 {
  name: "elevation",
  label: "Высота (м)",
  options: {
   filter: false,
  
  }
 },
 {
  name: "host",
  label: "Принадлежность",
  options: {
   filter: true,  
  }
 }, 
  {
  name: "lat",
  label: "Широта",
  options: {
   filter: false,  
  }
 },
  {
  name: "lon",
  label: "Долгота",
  options: {
   filter: false,  
  }
 },
];

const data = this.props.stations

const placeNameHeader='Станции наблюдения'
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