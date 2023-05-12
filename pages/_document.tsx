import { Html, Head, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel='preload' href='/fonts/IBMPlexSans-Bold.ttf' as='font' crossOrigin='anonymous' />
        <link rel='preload' href='/fonts/IBMPlexSans-Regular.ttf' as='font' crossOrigin='anonymous' />
        <link rel='preload' href='/fonts/IBMPlexSans-SemiBold.ttf' as='font' crossOrigin='anonymous' />
        <meta name="description" content='allow you to discover new coffee stores'></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
