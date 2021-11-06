import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import Amplify from '@aws-amplify/core'

import '../styles/globals.css'
import { createEmotionCache, theme } from '../constants'
import awsConfig from '../aws-exports'
import { RecoilRoot } from 'recoil'
import MainLayout from '../layout/MainLayout'

Amplify.configure({ ...awsConfig, ssr: true })

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Fullstack Powerhouse</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RecoilRoot>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RecoilRoot>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
