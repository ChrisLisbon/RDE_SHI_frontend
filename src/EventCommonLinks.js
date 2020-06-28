import React, {Component} from 'react';
import EventDocumentCards from './EventDocumentCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventCheckbox from './EventCheckbox.js';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {font_size} from './system_functions.js'

export default class EventCommonLinks extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    }
  }
  createDocumentCard=(eventData, vh)=>{
      if (eventData.common_links.length!==0){
              var allCards=eventData.common_links.map((common_links) => {
              var header = common_links.name_rus
              var body = common_links.description_rus
              var link = common_links.url
              return <EventDocumentCards newsHeader={header} newsBody={body} newsLink={link}/>
                
            })
            return allCards
      }
      else{
          return <Card style={{ margin: 5, height: '20%'}} >      
                  <Typography variant="body1" component="p" style={{margin: '25% 0', fontSize: font_size(vh, 1.8)}} align='center'>
                  Вспомогательные ссылки отсутствуют
                  </Typography>
                </Card>
      }
 }
 render(){
      const vh = window.innerHeight
      const eventData=this.props.eventData
      return(
      
      <div style={{margin:'0'}}>
          {this.createDocumentCard(eventData, vh)}
      </div>
      
         )
       }
     }