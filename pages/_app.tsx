import 'bootstrap/dist/css/bootstrap.min.css'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import NProgress from 'nprogress'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useMemo } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { UserJWTObj } from '../interfaces/user'
import { useAppDispatch } from '../redux/hooks'
import { getCategories } from '../redux/post/postActions'
import { wrapper } from '../redux/store'
import { getCurrentUser, setCurrentUser } from '../redux/user/userActions'
import { ToastContainer } from 'react-toastify'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'
import { DefaultSeo } from 'next-seo'

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = cookie.parse(document.cookie).token
    if (token) {
      const userJwtObj: UserJWTObj = jwt_decode(token)
      dispatch(getCurrentUser(userJwtObj?.id || null))
    }

    if (router.pathname !== '/') {
      dispatch(getCategories())
    }
  }, [])

  useEffect(() => {
    const token = cookie.parse(document.cookie).token

    if (!token) dispatch(setCurrentUser(null))
  }, [router.asPath])

  const isShowHeader: boolean = useMemo(() => {
    const hiddenPages = ['/login', '/register']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  const isShowFooter: boolean = useMemo(() => {
    const hiddenPages = ['/']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    const handleStart = () => {
      NProgress.set(0.5)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <div id='root'>
      <DefaultSeo
        title='Default - Funny photo social network - Meme'
        description='Default - This is a photo social network'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.url.ie/',
          site_name: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      {isShowHeader && <Header />}

      <main>
        <Component {...pageProps} />
        <ToastContainer />
      </main>

      {isShowFooter && <Footer />}
    </div>
  )
}

export default wrapper.withRedux(MyApp)
