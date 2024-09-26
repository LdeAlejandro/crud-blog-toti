

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import PaginationControls from "@/components/PaginationControllerUserPage/PaginationControllerUserPage";
import SearchPost from "@/components/SearchPost/SearchPost";


const Blog  = async({ params, searchParams }) => {
 
  const {user} = params;
  let posts
  let error = null;
  let data;
  let totalPosts;
  const sortOrder = searchParams.sort || "newest"; 
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '10';
  const searchTerm = searchParams['search'] ?? '';


  const paginationUrlApiRequest = `${process.env.SITE_URL}/api/posts?user=${user}&page=${page}&per_page=${per_page}&search=${searchTerm}`;
  
  const urlForSearchcompoenent = (`${process.env.SITE_URL}/posts/${user}?page=${page}&per_page=${per_page}`);
  const urlForSorterComponent = (`${process.env.SITE_URL}/posts/${user}?page=${page}&per_page=${per_page}&search=${searchTerm}`);

    const fetchPosts = async () => {
      try {

        const res = await fetch( `${paginationUrlApiRequest}` , { next: { revalidate: 60 } });
        
        if (!res.ok) {
          throw new Error("Falha ao buscar posts");
        }
         const response  = await res.json();
         data = response
         posts = response.posts;
         
         totalPosts= Number(response.totalPosts);

      } catch (err) {
        error = err.message;
     
      }
    }; 

    await fetchPosts();

    if (error) {
      return <p>Error: {error}</p>;
    }
    
    if (!Array.isArray(posts) || posts.length === 0) {
      return <p>Nenhum resultado encontrado para a sua busca.</p>;
    }

   

    const sortedPosts = posts.sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  })


   const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
   const end = start + Number(per_page) // 5, 10, 15 ...

  //  const entries = sortedPosts.slice(start, end)
  
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const textLength = text.split(" ").length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime;
  };

  return (
    <div>
       <div >
        <span className={styles.author}>{posts.length > 0 ? `Blogs de ${posts[0].name}` : 'Nenhum autor disponível'}</span>
        </div>
      {/* Barra de filtros */}
      <div className={styles.filterBar}>
        
        <Button btnClass={`${styles.filterButton} ${sortOrder === "newest" ? styles.active : ""}`} text={"Mais recentes"} url={`${urlForSorterComponent}&sort=newest`}/>
        <Button btnClass={`${styles.filterButton} ${sortOrder === "oldest" ? styles.active : ""}`} text={"Mais antigos"} url={` ${urlForSorterComponent}&sort=oldest`}/>
      </div>

      <SearchPost urlC={urlForSearchcompoenent}/>

      {/* Verificar se não há posts */}
      {totalPosts === 0 ? (
        <div className={styles.noPostsMessage}>
          <h2>Não há posts disponíveis!</h2>
          <p>
            Quer criar o primeiro post?{" "}
            <Link href="/blog/create-post" className={styles.createPostLink}>
              Clique aqui para criar um novo post.
            </Link>
          </p>
        </div>
      ) : (
        <div className={styles.postsWrapper}>
          <div className={styles.mainContainer}>
            {sortedPosts.map((post) => (
              <Link
                href={`/${post._id}`}
                className={styles.postCard}
                key={post._id}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={post.img || "/default-image.jpg"}
                    // src={"https://images.unsplash.com/photo-1725900737080-54b5a571b38c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h1 className={styles.title}>{post.title}</h1>
                  {/* <p className={styles.desc}>
                    {post.desc.length > 100
                      ? `${post.desc.substring(0, 100)}...`
                      : post.desc}
                  </p> */}
                  <p className={styles.readingTime}>
                    {calculateReadingTime(post.content)} min de leitura
                  </p>
                  {/* <button>Editar</button> */}

                  {/* Botão para curtir
                  <div className={styles.likeContainer}>
                    <button
                      className={styles.likeButton}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(post._id);
                      }}
                    >
                      👍 {likes[post._id] || 0} Curtidas
                    </button>
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
          <PaginationControls username={user} hasNextPage={end < totalPosts} hasPrevPage={start > 0 } totalPages={totalPosts} perPagePost={per_page}/>
        </div>
      )}

      {/* Botão flutuante para criar novo post */}
      {/* <button
        className={styles.createPostButton}
        onClick={() => (window.location.href = "/create-post")}
      >
        ➕ Criar Post
      </button> */}
    </div>
  );
};

export default Blog;