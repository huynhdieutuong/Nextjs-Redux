import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import Head from 'next/head'
import { Footer } from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
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

      <Header />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  )
}

export default MyApp
