import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card';
import coffeeStoreData from '../data/coffee-stores.json';
import {GetStaticProps} from 'next';
import { ICoffeeStore } from '@/interfaces';

interface IGetStaticProps {
  coffeeStore: Array<ICoffeeStore>;
}

export const getStaticProps: GetStaticProps = async () =>{   
  return {
    props:{
      coffeeStore: coffeeStoreData
    }
  }
}

export default function Home(props:IGetStaticProps)  {

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
          <Image 
          alt='hero-image' 
          src="/static/hero-image.png" 
          width={600} 
          height={300} 
          priority={true}
          />
        </div>
        {props.coffeeStore.length > 0 && (
          <>
          <h2 className={styles.heading2}>Popular Coffee Stores</h2>
          <div className={styles.cardLayout}>
          {
            props.coffeeStore.map(store => {
              return (
                <Card
                  title={store.name}
                  image={store.imgUrl}
                  className="card"
                  link={`/coffee-store/${store.id}`}
                  key={store.id}
                />
              )
            })
          }
        </div>
        </>
        )}
      </main>
    </>
  )
}
