import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { createTheme, Paper } from '@mui/material'
import nProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  nProgress.start()
})

Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#15803d',
      },
      secondary: {
        main: '#f43f5e',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Component {...pageProps} />
      </Paper>
    </ThemeProvider>
  )
}

export default MyApp
