import { createMuiTheme } from '@material-ui/core/styles';


export default createMuiTheme({
overrides: {
        MuiBox: {
            root: {
                padding: 0,
                height: '100%',
            },
        },

        MuiDialogContent: {
            root: {
                padding: 0,
                
            }
        },
    } 
});