import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { ICoffeeStore, IParam } from '@/interfaces';
import Head from 'next/head';
import styles from "../../styles/coffe-store.module.css"
import Image from 'next/image';
import cls from 'classnames';
import { placesService } from '@/services/places.service';
import { useContext, useEffect, useState } from 'react';
import { isEmpty } from '@/utils';
import { StoreContext } from '@/store/store-context';
import useSWR from 'swr';
import { fetcher } from '@/services/swr.service';

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params as IParam;
    const data = await placesService.getPlaces();
    const findCoffeStoreById = data.find((cs: ICoffeeStore) => cs.fsq_id === params.id);
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
    const router = useRouter();
    const id = router.query.id;

    const [coffeeStore, setCoffeeStores] = useState(initialProps.coffeeStore || {});
    const [votingCount, setVotingCount] = useState<number>(0);
    const { state: { coffeeStores } } = useContext(StoreContext);

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

    const handleCreateCoffeeStore = async (record: ICoffeeStore) => {
        try {
            const obj = {
                id: record.fsq_id,
                name: record.name,
                address: record.location.address || "",
                neighbourd: record.location.region || "",
                voting: 0
            };
            const response = await fetch('/api/createCoffeeStore', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            const dbCoffeeStores = await response.json();
        } catch (err) {

        }
    }

    const handleUpVoteButton = async () => {
        try {
            const response = await fetch('/api/updateCoffeeStore', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const dbCoffeeStores = await response.json();
            if (dbCoffeeStores && dbCoffeeStores.length > 0) {
                let counting = votingCount + 1;
                setVotingCount(counting);
            }
        } catch (error) {
            console.log("Error incrementing the voting count: ", error);
        }
    }

    useEffect(() => {
        if (data && data.length > 0) {
            setVotingCount(data[0].voting);
        }

    }, [data])


    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.fsq_id.toString() === id; //dynamic id
                });
                setCoffeeStores(findCoffeeStoreById as ICoffeeStore);
                handleCreateCoffeeStore(findCoffeeStoreById as ICoffeeStore);
            }
        } else {
            // SSG
            handleCreateCoffeeStore(initialProps.coffeeStore);
        }
    }, [id, initialProps.coffeeStore, coffeeStores]);



    if (router.isFallback) return <div>Loading....</div>

    const { name, location, imageUrl } = coffeeStore || {};

    if (error) return <div>Something went wrong retrieving coffee store page</div>

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
                <meta name="description" content={`${name} coffee stores`}></meta>
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
                        <p className={styles.text}>{votingCount}</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpVoteButton}>Up Vote!</button>
                </div>
            </div>
        </div>
    )
}
export default CoffeeStore;