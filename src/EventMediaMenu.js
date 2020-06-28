import React, {Component} from 'react';
import EventMediaCards from './EventMediaCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventImageDialog from './EventImageDialog.js';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export default class EventMediaMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
      clickedImageId: null,
      clickedImageType: null
    }
  }

  dialogOpen = ()=>{
  this.setState((prevState) => {
          return {dialogOpen:true}
      
        })

  }
  dialogClose = () =>{
    this.setState((prevState) => {
            return {dialogOpen:false}
        
          })


  }
  setClickedImageIdType=(id, type, path, title)=>{
    this.setState((prevState) => {
            return {clickedImageId: id,
                    clickedImageType: type,
                    clPath:path,
                    clTitle:title}
        
          })
  }

  createEventCard=(eventData, fileType)=>{
              if (eventData.multimedia_records.length==0){
                if (fileType=='photo'){
                  return <Card style={{width: '29.5vw', height: '29.5vh', margin: '0.5vh 0.5vw'}}>
                               <CardContent>    
                                    <Typography align='center' style={{margin: '25% 0'}} variant="body1" component="p">
                                      Фото отсутствуют
                                    </Typography>        
                                </CardContent>
                            </Card>
                }
                if (fileType=='video'){
                  return <Card style={{width: '29.5vw', height: '29.5vh', margin: '0.5vh 0.5vw'}}>
                               <CardContent>    
                                    <Typography align='center' style={{margin: '25% 0'}} variant="body1" component="p">
                                      Видео отсутствуют
                                    </Typography>        
                                </CardContent>
                            </Card>
                }
              }

              else{
              var allCards=eventData.multimedia_records.map((multimedia_records) => {
                console.log(multimedia_records)
              var title=multimedia_records.name_rus
              var path=multimedia_records.file
              
                if (fileType=='photo'){
                  var existing=false
                  if (multimedia_records.type=='photo'){
                    var existing=true;
                    var type='img'
                    var id = multimedia_records.id

                    return <ButtonBase onClick = {()=>{this.dialogOpen(); this.setClickedImageIdType(id, type, path, title)}}>
                           <EventMediaCards id={id} type={type} title={title} path = {path}  />
                           </ButtonBase>

                  }
                  if (existing==false){
                    return <Card style={{width: '29.5vw', height: '29.5vh', margin: '0.5vh 0.5vw'}}>
                               <CardContent>    
                                    <Typography align='center' style={{margin: '25% 0'}} variant="body1" component="p">
                                      Фото отсутствуют
                                    </Typography>        
                                </CardContent>
                            </Card>
                  }
                }                
                if (fileType=='video'){
                  var existingV=false
                  if (multimedia_records.type=='video'){
                    var existingV=true;
                    var type='iframe'
                    var id=multimedia_records.id
                    return <ButtonBase style={{width: '30vw', padding:0, margin:0}} onClick = {()=>{this.dialogOpen(); this.setClickedImageIdType(id, type, path, title)}}>
                           <EventMediaCards id={id} type={type} title={title} path = {path}/>
                           </ButtonBase>
                  }
                  if (existingV==false){
                    return <Card style={{width: '29.5vw', height: '29.5vh', margin: '0.5vh 0.5vw'}}>
                               <CardContent>    
                                    <Typography align='center' style={{margin: '25% 0'}} variant="body1" component="p">
                                      Видео отсутствуют
                                    </Typography>        
                                </CardContent>
                            </Card>
                  }
                }
                
              
                
            })
            return allCards}
 }
 returnDialog=(state, eventData)=>{
  if (state!=null){
      return <EventImageDialog open={this.state.dialogOpen} dialogClose={()=>this.dialogClose()} dialogOpen={()=>this.dialogOpen()}
                          eventData={eventData} clickedImageId={this.state.clickedImageId} type={this.state.clickedImageType}
                          path={this.state.clPath} title={this.state.clTitle}/>
  }

 }

    render(){
      const eventData=this.props.eventData
      const fileType=this.props.fileType
      return(
        <div >
        <Paper style={{maxHeight: '40vh', width: '30vw', padding: 0, margin:0,  overflow: 'auto', background: '#97C8B3'}}>
          {this.createEventCard(eventData, fileType)}

         </Paper>
        
         {this.returnDialog(this.state.clickedImageId, eventData)}

        </div>  
        
        )
    }
}