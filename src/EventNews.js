import React, {Component} from 'react';
import EventDocumentCards from './EventDocumentCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventCheckbox from './EventCheckbox.js';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

export default class EventNews extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    }
  }
  createDocumentCard=(eventData)=>{
    if (eventData.media_links.length!==0){
              var allCards=eventData.media_links.map((media_links) => {
              var header = media_links.name_rus
              var body = media_links.description_rus
              var link = media_links.url
              return <EventDocumentCards newsHeader={header} newsBody={body} newsLink={link}/>
                
            })
            return allCards
    }
    else{
      return <Card style={{background: '#ffffff',color: '#131E16', margin: 5, height: '20%'}} >      
                <Typography variant="body1" component="p" style={{margin: '25% 0', fontSize: '1.8vh'}} align='center'>
                Упоминания в новостях отсутствуют
                </Typography>
              </Card>
    }
 }
 render(){
      const eventData=this.props.eventData
      return(
      
      <div style={{margin:'0'}}>
          {this.createDocumentCard(eventData)}
      </div>
      
         )
       }
     }