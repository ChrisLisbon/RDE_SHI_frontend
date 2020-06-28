import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewTable from './Table.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';


export default function AlertDialog(props) {
  const open=props.open;
  const tableData = props.tableData;
  const tableName=props.tableName;
  const content=props.content;
  
  if (content=='table'){
  return (

    <div className='zeroWidth'>
      
      <Dialog
        open={open}
        onClose={()=>{props.dialogClose(); props.clearEventTableData()}}
        maxWidth = {'lg'}
      >
        
        <DialogContent>
          <NewTable data={tableData} tableName={tableName} setEventData={(event_id)=>props.setEventData(event_id)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.dialogClose(); props.clearEventTableData()}} color="primary" autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
  if (content=='waiting'){
    return (
          <div className='zeroWidth'>
      
          <Dialog
            open={open}
            onClose={()=>{props.dialogClose(); props.clearEventTableData()}}
            maxWidth = {'lg'}
          >
            
            <DialogContent>
              
                    <div style={{display: 'flex', justifyContent:"center", margin: '30% 0 0'}}>
                    <CircularProgress style={{color: green[500]}}/>
                    </div>
                    <Typography color="inherit" align='center' gutterBottom>
                      Загрузка данных...
                    </Typography>

            </DialogContent>
            
          </Dialog>
        </div>


    )
  }
}

