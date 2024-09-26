
'use client'
import { useRouter, useSearchParams} from 'next/navigation';
import styles from './SearchPost.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchPost = ({urlC}) => {
    
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortOrder = searchParams.get('sort') || 'newest';

  const searchPost= async(e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    await router.push(`${urlC}&search=${searchValue}&sort=${sortOrder}`);
    router.refresh();
      
  }

  return (
    <div className={styles.container}>
    <form id='search'  onSubmit={searchPost}>
     <input type="search"/>
     <button type='submit'><FontAwesomeIcon icon={faSearch} className={styles.icon} type='submit'/></button>
     </form>
    </div>
  )
}

export default SearchPost;