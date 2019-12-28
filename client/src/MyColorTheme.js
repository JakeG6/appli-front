import { createMuiTheme } from '@material-ui/core/styles';


const muiTheme = createMuiTheme({
    palette: {
        primary: { 
            main: '#36c136',
            contrastText: '#fff', 
        }, 
        secondary: { main: '#4286f4' },
        background:{
            paper:'white',
            default:"#fafafa"}
    }
});



export default muiTheme
