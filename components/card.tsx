import Image from "next/image";
import Link from "next/link";
import styles from "../styles/card.module.css";
import cls from 'classnames';

interface ICard {
    title:string;
    image: string;
    link: string;
    className:string;
}
const Card = (props: ICard) => {
    return (
        <Link href={props.link} className={`${styles.cardLink} glass`}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{props.title}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image 
                    className={styles.cardImage} 
                    src={props.image} 
                    alt="coffee-thumbnail" 
                    width={260} 
                    height={160}
                    />
                </div>
            </div>
        </Link>
    )
}
export default Card;