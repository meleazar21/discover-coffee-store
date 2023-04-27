import Link from 'next/link';
import {useRouter} from 'next/router'

const CoffeeStore = () => {
    const router = useRouter();
    return(
        <div>
            Coffee Store {router.query.id} 
            <Link href="/">Back to home</Link>
        </div>
    )
}
export default CoffeeStore;