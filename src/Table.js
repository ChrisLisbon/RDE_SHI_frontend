import MUIDataTable from "mui-datatables";
import React, {Component} from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {frontend_settings} from './server_settings.js'

export default class NewTable extends Component{
  constructor(props){
    super(props)
    this.state = {
      propsData: null
    }
  }
onRowClick = (rowData: string[]) => {
  var name_rus=rowData[0]
  var event_id=this.detEventId(name_rus, this.props.data)
  console.log(event_id)
  this.props.setEventData(event_id,)
  window.open('http://'+ frontend_settings.host+ ':'+frontend_settings.port+'/eventid/#'+event_id,'_blank');
  
}
getData=(propsData)=>{
  if(propsData!=null){
    var eventsList =[]
    propsData.data.events.map((events) =>{
       eventsList.push(events)            
    })
  
  return eventsList
  }
  else {
    
    return []}
  }
detEventId=(name_rus, propsData)=>{
  var event_id=''
  propsData.data.events.map((events) =>{
      if (events.name_rus==name_rus){
        event_id=events.id
      }
      
            
    })
  return event_id
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
  name: "name_rus",
  label: "Название",
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
  name: "reason",
  label: "Причина",
  options: {
   filter: true,

  }
 },
 {
  name: "cost_rub",
  label: "Ущерб (руб)",
  options: {
   filter: false,
  
  }
 },
 {
  name: "area_km",
  label: "Площадь (км)",
  options: {
   filter: false,
  
  }
 }, 
];

const data = this.getData(this.props.data)

const placeNameHeader='События, произошедшие в: '+this.props.tableName
const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  search: true,
  responsive: 'scrollMaxHeight',
  selectableRowsHeader: false,
  selectableRows: 'none',
  pagination:false,
  onRowClick: this.onRowClick,
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