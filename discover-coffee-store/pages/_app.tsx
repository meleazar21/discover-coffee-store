import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>© 2023 meleazar</p>
      </footer>
    </>
  )   
}
