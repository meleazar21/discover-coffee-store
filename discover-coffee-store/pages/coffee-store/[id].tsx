import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import coffeStoreData from "../../data/coffee-stores.json";
import { ICoffeeStore, IParam } from '@/interfaces';
import Head from 'next/head';
import styles from "../../styles/coffe-store.module.css"
import Image from 'next/image';
import cls from 'classnames';

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params as IParam;
    const selectedData = coffeStoreData.find(cs => cs.id === parseInt(params.id));
    return {
        props: {
            coffeeStore: selectedData
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    const paths = coffeStoreData.map(cs => {
        return {
            params: {
                id: cs.id.toString()
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

const CoffeeStore = (props: IGetStaticProps) => {
    const router = useRouter();

    if (router.isFallback) return <div>Loading....</div>

    const { address, name, neighbourhood, imgUrl } = props.coffeeStore

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
                        <Link href="/">Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl}
                        alt={name}
                        width={400}
                        height={20}
                        className={styles.storeImg}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image alt="icon-coffe" src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt='icon-coffee' src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}>{neighbourhood}</p>
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