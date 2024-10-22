
'use client'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import PaginationControls from "@/components/PaginationController/PaginationController";
import SearchPost from "@/components/SearchPost/SearchPost";
import { useRouter, useSearchParams } from 'next/navigation';


const Posts  = ({user}) => {
  const router = useRouter()
  const [posts, setPosts] = useState([]);

  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();

  const sortOrder = searchParams.get('sort') || "newest";
  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('per_page') || '10';
  const searchTerm = searchParams.get('search') || '';



    useEffect(() => {
      console.log('fetchPosts');

      const basePath = user ? `user=${user}&` : '';
      console.log(user)
      // Cria a URL da API com os parâmetros
      const paginationUrlApiRequest = `/api/posts?${basePath}page=${page}&per_page=${per_page}&search=${searchTerm}&sort=${sortOrder}`;

  
    const fetchPosts = async () => {
      //setPaginationUrlApiRequest(paginationUrlApiRequest)
      try {
        const res = await fetch( `${paginationUrlApiRequest}`);
        
        if (!res.ok) {
          throw new Error("Falha ao buscar posts");
        }
         const response  = await res.json();

         setPosts(response.posts);
         setTotalPosts(Number(response.totalPosts));
        
      } catch (err) {
        setError(err.message);
     
      }
    }; 
          fetchPosts();
      },[user, sortOrder, page, per_page, searchTerm]);

    if (error) {
      return <p>Error: {error}</p>;
    }
    
    if (!Array.isArray(posts) || posts.length === 0) {
      return <p>Nenhum resultado encontrado para a sua busca.</p>;
    }

      const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const textLength = text.split(" ").length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime;
  };

   

    const sortedPosts = posts.sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  })
//  console.log("*****\n",sortedPosts[0].title)

   // mocked, skipped and limited in the real app
   const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
   const end = start + Number(per_page) // 5, 10, 15 ...

  //  const entries = sortedPosts.slice(start, end)


  return (
    <div>
              <SearchPost/>
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

        </div>
      )}

<PaginationControls username={user} hasNextPage={end < totalPosts} hasPrevPage={start > 0 } totalPages={totalPosts} perPagePost={per_page}/>

    </div>
  );
};

export default Posts;