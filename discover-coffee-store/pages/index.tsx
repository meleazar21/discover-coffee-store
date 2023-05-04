import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card';
import { GetStaticProps } from 'next';
import { ICoffeeStore } from '@/interfaces';
import { placesService } from '@/services/places.service';
import useTrackLocation from '@/hooks/use-track-location';
import { useContext, useEffect, useState } from 'react';
import { ActionType } from '@/state/action-types';
import { StoreContext } from '@/store/store-context';

interface IGetStaticProps {
  coffeeStore: Array<ICoffeeStore>;
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await placesService.getPlaces();
  return {
    props: {
      coffeeStore: data
    }
  }
}

export default function Home(props: IGetStaticProps) {

  const [nearbyStoresError, setNearbyStoreError] = useState<string>('');
  const { handleTrackLocation, locationErrorMessage, isFinding } = useTrackLocation();
  const { dispatch, state } = useContext(StoreContext);
  const { latlong, coffeeStores } = state;
  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  useEffect(() => {
    async function fetchNearbyCoffeeStores() {
      if (!latlong) return;

      try {
        /*
        Making request to external api using the service class
        const nearbyPlaces = await placesService.getPlaces(latlong,40);
        */
        /* Making request using serverless function to call own api located
           in the api folder of this nextjs project.
        */
        const response = await fetch(`/api/getCoffeeStoreByLocation?latLong=${latlong}&limit=${30}`);
        const nearbyPlaces = await response.json();

        dispatch({
          type: ActionType.SET_COFFEE_STORES,
          payload: nearbyPlaces
        });

      } catch (error: any) {
        setNearbyStoreError(error.message);
      }
    }
    fetchNearbyCoffeeStores();
  }, [state.latlong])

  return (
    <>
      <Head>
        <title>Coffee Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFinding ? "Locating..." : "View Stores nearby"}
          handleClick={handleOnBannerBtnClick}
        />
        {locationErrorMessage && <p>Something went wrong: {locationErrorMessage}</p>}
        {nearbyStoresError && <p>Something went wrong: {nearbyStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            alt='hero-image'
            src="/static/hero-image.png"
            width={600}
            height={300}
            priority={true}
          />
        </div>
        {coffeeStores && coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {
                coffeeStores.map((store: ICoffeeStore) => {
                  return (
                    <Card
                      title={store.name}
                      image={store.imageUrl}
                      className="card"
                      link={`/coffee-store/${store.fsq_id}`}
                      key={store.fsq_id}
                    />
                  )
                })
              }
            </div>
          </div>
        )}
        {props.coffeeStore.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Managua Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {
                props.coffeeStore.map((store: ICoffeeStore) => {
                  return (
                    <Card
                      title={store.name}
                      image={store.imageUrl}
                      className="card"
                      link={`/coffee-store/${store.fsq_id}`}
                      key={store.fsq_id}
                    />
                  )
                })
              }
            </div>
          </div>
        )}
      </main>
    </>
  )
}
