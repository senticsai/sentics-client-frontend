// ** React Imports
import {ReactNode} from 'react'

// ** Next Imports
import Head from 'next/head'
import {Router} from 'next/router'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import {CacheProvider} from '@emotion/react'
import type {EmotionCache} from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n';
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import {Toaster} from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import {SettingsConsumer, SettingsProvider} from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Reinvent Your Safety`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Reinvent Your Safety.`}
        />
        <meta name='viewport' content='initial-scale=1, width=device-width'/>
      </Head>

        <SettingsProvider {...(setConfig ? {pageSettings: setConfig()} : {})}>
          <SettingsConsumer>
            {({settings}) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    {getLayout(<Component {...pageProps} />)}
                  </WindowWrapper>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={{className: 'react-hot-toast'}}/>
                  </ReactHotToast>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
    </CacheProvider>

  )
}

export default App
