import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'

import type { AppContext, AppProps } from 'next/app'
import { Header } from '../components/Header'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { useContext, useMemo } from 'react'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import { UserJWTObj } from '../interfaces/user'
import userService from '../services/user'
import UserState from '../contexts/user/UserState'
import UserContext from '../contexts/user/userContext'

interface WrapperProps {
  children: React.ReactNode
  userInfo: object
}
function Wrapper({ children, userInfo }: WrapperProps) {
  const { setCurrentUser } = useContext(UserContext)
  useMemo(() => {
    setCurrentUser(userInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const isShowHeader: boolean = useMemo(() => {
    const hiddenPages = ['/login', '/register']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  const isShowFooter: boolean = useMemo(() => {
    const hiddenPages = ['/']
    return hiddenPages.indexOf(router.pathname) === -1
  }, [router.pathname])

  return (
    <UserState>
      <Wrapper {...pageProps}>
        <div id='root'>
          <Head>
            <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
              name='viewport'
              content='width=device-width, minimum-scale=1, maximum-scale=1'
            />
            <meta name='keywords' content='HTML5 Template' />
            <meta
              name='description'
              content='Funny photo social network - Meme'
            />
            <link rel='icon' href='/favicon.ico' />
            <title>Funny photo social network - Meme</title>
          </Head>

          {isShowHeader && <Header />}

          <main>
            <Component {...pageProps} />
          </main>

          {isShowFooter && <Footer />}
        </div>
      </Wrapper>
    </UserState>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let resUser: any = null

  if (typeof window === 'undefined') {
    const cookieString = appContext.ctx.req?.headers.cookie || ''
    const token = cookie.parse(cookieString).token
    if (token) {
      const userJwtObj: UserJWTObj = jwt_decode(token)
      resUser = await userService.getUserById(userJwtObj?.id)
    }
  }

  return {
    pageProps: {
      userInfo: resUser?.user,
    },
  }
}

export default MyApp
