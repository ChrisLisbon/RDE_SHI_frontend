import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';

import {postCommonLink} from './request_functions.js'

const useStyles = makeStyles(theme => ({
  box: {

    width: '100%',
    
  },
  margin: {
    margin: '0 0 0 0',
    fontSize: 11,
    
  },
  textfield: {
    width: '100%'
    
  },
  textfield2: {
    width: '100%', 
    height: '5vh',
  },

}));





export default function AdminCommonLinksBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      
      url: '',
      name_rus: '',
      name_eng:'',
      lang: '',
      description_rus:'',
      description_eng:'',
      
      
      });


  const linkInfo =[{      
      url: state.url,
      name_rus: state.name_rus,
      name_eng: state.name_eng,
      lang: state.lang,
      description_rus:state.description_rus,
      description_eng: state.description_eng,
  }]
  const form=new FormData;
  form.append('common_links', JSON.stringify(linkInfo))
  
  const setUrl=(event)=>{
      setState({ ...state, url: event.target.value,
                          });
    
  }
  const setNameRus=(event)=>{
      setState({ ...state, name_rus: event.target.value,
                           });
     
  }
  const setNameEng=(event)=>{
      setState({ ...state, name_eng: event.target.value,
                            });
      
  }
  const setDescRus=(event)=>{
      setState({ ...state, description_rus: event.target.value,
                            });
      
  }
  const setDescEng=(event)=>{
      setState({ ...state, description_eng: event.target.value,
                             });
      
  }
  const setLang=(event)=>{
      setState({ ...state, lang: event.target.value,
                             });   
      
  }
  const pushNewLink=()=>{
    if(linkInfo[0].url!==''&&linkInfo[0].name_rus!==''&&linkInfo[0].name_eng!==''&&linkInfo[0].description_rus!==''&&linkInfo[0].description_eng!==''&&linkInfo[0].lang!==''){
      postCommonLink(form, props.login, props.password).then(data=>
        props.closeDialog('common_links_list')
        )
      }
}
  return (
    <div className={classes.box}>     
      
      <TextField className={classes.textfield} value={state.url} onChange={(event)=>setUrl(event)} id="url" label="URL"/>
      <TextField className={classes.textfield} value={state.name_rus} onChange={(event)=>setNameRus(event)} id="name_rus" label="Название (рус.)"/>
      <TextField className={classes.textfield} value={state.name_eng} onChange={(event)=>setNameEng(event)} id="name_eng" label="Название (англ.)"/>
      <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>setDescRus(event)}id="description_rus" label="Описание (рус.)"/>
      <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>setDescEng(event)} id="description_eng" label="Описание (англ)"/>
      <TextField className={classes.textfield} value={state.lang} onChange={(event)=>setLang(event)} id="lang" label="Язык"/>
      <div className={classes.textfield2}></div>
      <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                            onClick={()=>pushNewLink()}>Добавить</Button>     
    </div>
      )
    }