
'use client'
import { useRouter, useSearchParams} from 'next/navigation';
import styles from './SearchPost.module.css';

const SearchPost = (
  {
 
  }
) => {
    
  const router = useRouter()
  const searchParams = useSearchParams()


  return (
    <div className={styles.container}>
     <input type="search" />
    </div>
  )
}

export default SearchPost;