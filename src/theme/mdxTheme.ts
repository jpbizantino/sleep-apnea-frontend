import { createTheme, PaletteColorOptions } from '@mui/material'
import { red } from '@mui/material/colors'
import type {} from '@mui/x-date-pickers/themeAugmentation'

declare module '@mui/material/styles' {
  interface CustomPalette {
    colorLevel5Gray: PaletteColorOptions
    colorLevel4White: PaletteColorOptions
    colorGageGreen: PaletteColorOptions
    colorGageYellow: PaletteColorOptions
    colorGageRed: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    colorLevel5Gray: true
    colorLevel4White: true
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    colorLevel5Gray: true
    colorLevel4White: true
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    colorLevel5Gray: true
    colorLevel4White: true
  }
}

// declare module '@mui/material/AppBar' {
//   interface AppBarPropsColorOverrides {
//     graySanMiguel: true
//   }
// }

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    colorGageRed: true
    colorGageGreen: true
    colorGageYellow: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    colorGageRed: true
    colorGageGreen: true
    colorGageYellow: true
  }
}

// Create a theme instance.
const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } })

export const mdxTheme = createTheme({
  // shape: {
  //   borderRadius: 4, // defaults to 4
  // },
  palette: {
    primary: {
      //main: '#5983FC',
      main: '#1877F2',
    },
    secondary: {
      //main: '#3E60C1',
      main: '#4267B2',
    },
    error: {
      main: red.A400,
    },

    colorLevel5Gray: createColor('#F6F7F8'),
    colorLevel4White: createColor('#FFFFFF'),
    colorGageRed: createColor('#fa051d'),
    colorGageGreen: createColor('#00FF00'),
    colorGageYellow: createColor('#FFBF00'),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          // backgroundColor: '#5983FC',
        },
      },
    },

    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          // backgroundColor: '#5983FC',
        },
      },
    },

    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
})

//Source: https://www.schemecolor.com/shades-of-blue.php
