import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AdminPlacesTable from './AdminPlacesTable.js'
import AdminPlacesBlock from './AdminPlacesBlock.js'
import AdminEventsTableForPlace from './AdminEventsTableForPlace.js'

export default function AdminEventDialog(props) {
    const [state, setState] = React.useState({
      open: false,
      placeDialog: false,
      placeName: null,

      mode: 'new',

      eventDialog:false,

      addPlaceDialog:false,

      });



  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const dialogOpen = () => {
    setState({ ...state,  mode: 'new',
                          placeDialog: true });
  };

  const dialogClose = () => {
    setState({ ...state, placeDialog: false });
  };

  const closeAddPlaceDialog = () => {
    setState({ ...state, addPlaceDialog: false,
                         placeDialog: false});
  };
  const setPlaceForOldEvent=(placeName, placeId)=>{
    console.log(placeId)
    props.setPlaceForOldEvent(placeName,placeId);
    setState({...state, eventDialog:true})
  }
  const eventDialogClose=()=>{
    setState({ ...state, eventDialog: false });
  }
  const setOldMode=()=>{
    setState({...state, mode:'old',
                        placeDialog: true});

    console.log(state)
  }
  return (
    <div>
      <Button color="secondary" variant="outlined" size="small" onClick={handleClickOpen}>События</Button>
      <Dialog
        open={state.open}
        onClose={handleClose}>
        <DialogContent>
          <DialogContentText color="inherit" align='center' gutterBottom>
            Выберите действие:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogOpen} color="primary" autoFocus>
            Создать новое событие
          </Button>

        <Dialog
                  open={state.placeDialog}
                  onClose={()=>dialogClose()}>
            <DialogContent>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Выберите место события из таблицы
                    </DialogContentText>
                    <AdminPlacesTable setPlaceForEvent={(placeName, placeId)=>props.setPlaceForEvent(placeName, placeId)}                                      
                                      setPlaceForOldEvent= {(placeName, placeId)=>setPlaceForOldEvent(placeName, placeId)} mode={state.mode}/>
            </DialogContent>
            <DialogActions>
                    <Button onClick={()=>setState({...state, addPlaceDialog:true })} color="primary" autoFocus>
                      Места нет в списке - создать новую запись
                    </Button>
            </DialogActions>
        </Dialog>
        <Dialog
                  open={state.addPlaceDialog}
                  onClose={()=>closeAddPlaceDialog()}>
            <DialogContent>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Добавьте данные о месте
                    </DialogContentText>
                    <AdminPlacesBlock login={props.login} password={props.password} closeAddPlaceDialog={()=>closeAddPlaceDialog()}/>
            </DialogContent>

        </Dialog>

        <Dialog
                  open={state.eventDialog}
                  fullWidth={true}
                  maxWidth='lg'
                  onClose={()=>eventDialogClose()}>
            <DialogContent>
                    <DialogContentText color="inherit" align='center' gutterBottom>
                      Выберите событие из таблицы
                    </DialogContentText>
                    <AdminEventsTableForPlace setIdForOldEvent={(eventName, eventId)=>props.setIdForOldEvent(eventName, eventId)} placeId={props.placeId}/>
            </DialogContent>
        </Dialog>




          <Button onClick={()=>setOldMode()} color="primary" >
            Редактировать событие
          </Button>


        </DialogActions>
      </Dialog>
    </div>
  );
}