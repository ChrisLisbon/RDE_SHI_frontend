import React, {Component} from 'react';
import EventMediaCards from './EventMediaCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventImageDialog from './EventImageDialog.js';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export default class EventPhotosPaper extends Component{
  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
      clickedImageId: null,
      clickedImageType: null,
      emptyCard:false,
      
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

  setEmptyCardTrue=()=>{
    this.setState((prevState) => {
            return {emptyCard:false}
        
          })
  }
  createEventCard=(eventData, fileType)=>{
              if (eventData.multimedia_records.length==0){
                
                  return <Card style={{minWidth:0, width: '30vw', height: '30vh', margin: 0, padding:0}}>
                               <CardContent style={{width: '30vw', height: '30vh', margin: 0, padding:0}}>    
                                    <Typography style={{margin:'13.5vh', paddng:0}} align='center'  variant="body1" component="p">
                                      {<span style={{ fontSize: '1.5vh' }}>Фото отсутствуют</span>}
                                    </Typography>        
                                </CardContent>
                            </Card>
                
              }

              else{
                const allCards=[]
                 eventData.multimedia_records.forEach((el)=>{
                    if (el.type=='photo'){
                      var type='img'
                      var id = el.id
                      var title=el.name_rus+' ('+el.source+')'
                      var path=el.file
                      allCards.push(<ButtonBase onClick = {()=>{this.dialogOpen(); this.setClickedImageIdType(id, type, path, title)}}>
                                        <EventMediaCards id={id} type={type} title={title}  path = {path}  />
                                    </ButtonBase>)
                    }                
              })
              if (allCards.length==0){
                  return <Card style={{minWidth:0, width: '30vw', height: '30vh', margin: 0, padding:0}}>
                               <CardContent style={{width: '30vw', height: '30vh', margin: 0, padding:0}}>    
                                    <Typography style={{margin:'13.5vh', paddng:0}} align='center'  variant="body1" component="p">
                                      {<span style={{ fontSize: '1.5vh' }}>Фото отсутствуют</span>}
                                    </Typography>        
                                </CardContent>
                            </Card>
                }
              else{
                  return allCards
              }
            }







              
 }
 returnDialog=(state, eventData)=>{
  if (state!=null){
      console.log(this.state.clPath)
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
        <Paper style={{maxHeight: '40vh', width: '30vw', padding: 0, margin:0,  overflowX: 'hidden', overflowY: 'auto', background: '#97C8B3'}}>
          {this.createEventCard(eventData, fileType)}

         </Paper>
        
         {this.returnDialog(this.state.clickedImageId, eventData)}

        </div>  
        
        )
    }
}