import React, {Component} from 'react';
import EventMediaCards from './EventMediaCards.js'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export default class EventPhotosPaper extends Component{
  constructor(props){
    super(props)
    this.state = {
      emptyCard:false,
      
    }
  }


  setEmptyCardTrue=()=>{
    this.setState((prevState) => {
            return {emptyCard:false}
        
          })
  }
  createEventCard=(eventData)=>{
              if (eventData.multimedia_records.length==0){
                
                  return <Card style={{minWidth:0, width: '30vw', height: '30vh', margin: 0, padding:0}}>
                               <CardContent style={{width: '30vw', height: '30vh', margin: 0, padding:0}}>    
                                    <Typography style={{margin:'13.5vh', paddng:0}} align='center'  variant="body1" component="p">
                                      {<span style={{ fontSize: '1.5vh' }}>Видео отсутствуют</span>}
                                    </Typography>        
                                </CardContent>
                            </Card>
                
              }

              else{
                const allCards=[]
                 eventData.multimedia_records.forEach((el)=>{
                    if (el.type=='video'){
                      var type='iframe'
                      var id = el.id
                      var title=el.name_rus+' ('+el.source+')'
                      var path=el.file
                      allCards.push(<EventMediaCards id={id} type={type} title={title} path = {path}/>)
                    }                
              })
              if (allCards.length==0){
                  return <Card style={{minWidth:0, width: '30vw', height: '30vh', margin: 0, padding:0}}>
                               <CardContent style={{width: '30vw', height: '30vh', margin: 0, padding:0}}>    
                                    <Typography style={{margin:'13.5vh', paddng:0}} align='center'  variant="body1" component="p">
                                      {<span style={{ fontSize: '1.5vh' }}>Видео отсутствуют</span>}
                                    </Typography>        
                                </CardContent>
                            </Card>
                }
              else{
                  return allCards
              }
            }







              
 
 

 }

    render(){
      const eventData=this.props.eventData
      
      return(
        <div >
        <Paper style={{maxHeight: '40vh', width: '30vw', padding: 0, margin:0,  overflowX: 'hidden', overflowY: 'auto', background: '#97C8B3'}}>
          {this.createEventCard(eventData)}

         </Paper>
        
         

        </div>  
        
        )
    }
}