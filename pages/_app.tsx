import 'bootstrap/dist/css/bootstrap.min.css'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { UserJWTObj } from '../interfaces/user'
import { wrapper } from '../redux/store'
import { setCurrentUser } from '../redux/user/userActions'
import userService from '../services/user'
import '../styles/globals.scss'

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  const isShowHeader: boolean = useMemo(() => {
    const hiddenPages = ['/login', '/register']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  const isShowFooter: boolean = useMemo(() => {
    const hiddenPages = ['/']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  return (
    <div id='root'>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, maximum-scale=1'
        />
        <meta name='keywords' content='HTML5 Template' />
        <meta name='description' content='Funny photo social network - Meme' />
        <link rel='icon' href='/favicon.ico' />
        <title>Funny photo social network - Meme</title>
      </Head>

      {isShowHeader && <Header />}

      <main>
        <Component {...pageProps} />
      </main>

      {isShowFooter && <Footer />}
    </div>
  )
}

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext: any) => {
    if (typeof window === 'undefined') {
      const cookieString = appContext.ctx.req?.headers.cookie || ''
      const token = cookie.parse(cookieString).token
      console.log('token', token)
      if (token) {
        const userJwtObj: UserJWTObj = jwt_decode(token)
        const resUser = await userService.getUserById(userJwtObj?.id)
        store.dispatch(setCurrentUser(resUser?.data?.user || null))
      }
    }
  }
)

export default wrapper.withRedux(MyApp)
