import styles from "../styles/banner.module.css";

interface IBanner {
    buttonText: string;
    handleClick: Function;
}

const Banner = (props: IBanner) => {

    const buttonHandle = () => {
        props.handleClick();
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee</span><span className={styles.title2}>Finder</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee shops!</p>
            <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={buttonHandle}>{props.buttonText}</button>
            </div>
        </div>
    )
}
export default Banner;