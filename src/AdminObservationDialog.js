import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AdminEventDialog(props) {
    const [state, setState] = React.useState({
      open: false,
      });

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button color="secondary" variant="outlined" size="small" onClick={handleClickOpen}>Наблюдения</Button>
      <Dialog
        open={state.open}
        onClose={handleClose}>
        <DialogContent>
          <DialogContentText color="inherit" align='center' gutterBottom>
            Выберите действие:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setHydroObsChoise} color="primary" autoFocus>
            Добавить наблюдение гидропоста
          </Button>
          <Button onClick={props.setMeteoObsChoise} color="primary" >
            Добавить наблюдение метеостанции
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}