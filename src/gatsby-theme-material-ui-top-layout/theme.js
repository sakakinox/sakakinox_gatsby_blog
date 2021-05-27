import { createMuiTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#ff93c1",
      main: "#ef6091",
      dark: "#b92a64",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily:[
      'Noto Sans JP',
      'sans'
    ].join(","),
    fontSize: 15,
    h1:{
      fontSize: "2rem"
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
})

export default theme;