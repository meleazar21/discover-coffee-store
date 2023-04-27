import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('Hi banner clicked');
  }
  return (
    <>
      <Head>
        <title>Coffee Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner 
        buttonText='View Stores Nearby' 
        handleClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image alt='hero-image' src="/static/hero-image.png" width={600} height={300} priority={true}/>
        </div>
      </main>
    </>
  )
}
