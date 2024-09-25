
'use client'
import { useRouter, useSearchParams} from 'next/navigation';
import styles from './PaginationController.module.css';

const PaginationControls = (
  {
    hasNextPage,
    hasPrevPage,
    totalPages,
    perPagePost
  }
) => {
    
  const router = useRouter()
  const searchParams = useSearchParams()


  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? perPagePost

  console.log('controller', hasNextPage, hasPrevPage)

  return (
    <div className={styles.container}>
      <button
        
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
         &le;
      </button>

      <div>
        {page} / {Math.ceil(totalPages / Number(per_page))}
      </div>

      <button
        
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
         &ge;
      </button>
    </div>
  )
}

export default PaginationControls