/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=optional'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='/fonts/font-awesome/css/font-awesome.css'
        />
        <link rel='stylesheet' href='/fonts/emotion/style.css' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
