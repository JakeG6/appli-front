import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';

export default createMuiTheme({
    palette: {
        primary: { // works
          main: '#165788',
          contrastText: '#fff',
        },
        secondary: { // works
          main: '#69BE28',
          contrastText: '#fff',
        },
        companyBlue: { // doesnt work - defaults to a grey button
            main: '#65CFE9',
            contrastText: '#fff',
        },
        companyRed: { // doesnt work - grey button
            main: '#E44D69',
            contrastText: '#000',
        },
        accent: { // doesnt work - grey button
            main: purple[500], // import purple doesnt work
            contrastText: '#000',
        },
    },
});