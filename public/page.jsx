"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Falha ao buscar posts");
        }
        const data = await res.json();
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const textLength = text.split(" ").length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime;
  };

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  if (isLoading) {
    return <p>Carregando posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Barra de filtros */}
      <div className={styles.filterBar}>
        <button
          onClick={() => setSortOrder("newest")}
          className={sortOrder === "newest" ? styles.active : ""}
        >
          Mais recentes
        </button>
        <button
          onClick={() => setSortOrder("oldest")}
          className={sortOrder === "oldest" ? styles.active : ""}
        >
          Mais antigos
        </button>
      </div>

      {/* Verificar se não há posts */}
      {posts.length === 0 ? (
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
                href={`/blog/${post._id}`}
                className={styles.postCard}
                key={post._id}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={post.img || "/default-image.jpg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h1 className={styles.title}>{post.title}</h1>
                  <p className={styles.desc}>
                    {post.desc.length > 100
                      ? `${post.desc.substring(0, 100)}...`
                      : post.desc}
                  </p>
                  <p className={styles.readingTime}>
                    {calculateReadingTime(post.desc)} min de leitura
                  </p>

                  {/* Botão para curtir */}
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Botão flutuante para criar novo post */}
      <button
        className={styles.createPostButton}
        onClick={() => (window.location.href = "/blog/create-post")}
      >
        ➕ Criar Post
      </button>
    </div>
  );
};

export default Blog;
