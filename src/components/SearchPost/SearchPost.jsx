
'use client'
import { useRouter, useSearchParams} from 'next/navigation';
import styles from './SearchPost.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchPost = () => {
    
  const router = useRouter()
  const searchParams = useSearchParams()


  const searchPost= async(e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    const params = new URLSearchParams(searchParams.toString());

    // Atualize ou adicione o parâmetro 'sort'
    params.set('search', searchValue);
    params.set('page', '1');

    // Atualize a URL, preservando os outros parâmetros
    router.replace(`?${params.toString()}`)
    await router.refresh();
      
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