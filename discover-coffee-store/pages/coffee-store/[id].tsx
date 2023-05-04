import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import coffeStoreData from "../../data/coffee-stores.json";
import { ICoffeeStore, IParam } from '@/interfaces';
import Head from 'next/head';
import styles from "../../styles/coffe-store.module.css"
import Image from 'next/image';
import cls from 'classnames';
import { placesService } from '@/services/places.service';
import { useContext, useEffect, useState } from 'react';
import { isEmpty } from '@/utils';
import { StoreContext } from '@/store/store-context';

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params as IParam;
    const data = await placesService.getPlaces();
    const findCoffeStoreById = data.find((cs: ICoffeeStore) => cs.fsq_id === params.id);
    console.log('findCoffeStoreById: ' + findCoffeStoreById);
    return {
        props: {
            coffeeStore: findCoffeStoreById ? findCoffeStoreById : {}
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await placesService.getPlaces();
    const paths = data.map(cs => {
        return {
            params: {
                id: cs.fsq_id
            }
        }
    });
    return {
        paths,
        fallback: true
    }
}

interface IGetStaticProps {
    coffeeStore: ICoffeeStore
}

const CoffeeStore = (initialProps: IGetStaticProps) => {

    const [coffeeStore, setCoffeeStores] = useState(initialProps.coffeeStore);

    const router = useRouter();
    const id = router.query.id;
    const { state: { coffeeStores } } = useContext(StoreContext);

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore || {})) {
            if (coffeeStores.length > 0) {
                const findCoffeStoreById = coffeeStores.find((cs: ICoffeeStore) => cs.fsq_id === id);
                if (!findCoffeStoreById) return;
                setCoffeeStores(findCoffeStoreById);
            }
        }
    }, [id])

    if (router.isFallback) return <div>Loading....</div>

    const { name, location, imageUrl } = coffeeStore || {};

    const handleUpvoteButton = () => {
        console.log("Handle Button")
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">← Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imageUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                        alt={name || "coffee"}
                        width={400}
                        height={20}
                        className={styles.storeImg}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image alt="icon-coffe" src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}>{location?.address!}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt='icon-coffee' src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}>{location?.region!}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt='icon-coffee' src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>1</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote!</button>
                </div>
            </div>
        </div>
    )
}
export default CoffeeStore;