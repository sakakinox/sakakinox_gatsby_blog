import { createMuiTheme } from "@material-ui/core/styles"

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
      'Noto Sans',
      'sans-serif',
    ].join(","),
    fontSize: 12,
    h1: {
      fontsize: "1.75rem"
    }
  }
})

export default theme;