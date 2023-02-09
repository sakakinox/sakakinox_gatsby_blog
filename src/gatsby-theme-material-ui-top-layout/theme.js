import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      light: "#ffa4a2",
      main: "#e57373",
      dark: "#af4448",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#e35083",
      main: "#ad1357",
      dark: "#78002e4",
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