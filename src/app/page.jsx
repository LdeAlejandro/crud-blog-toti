"use client";  // Indica que é um Componente Cliente

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";  
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/posts");  
        if (!res.ok) {
          throw new Error("Erro ao buscar posts");
        }
        const data = await res.json();
        
        
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts.slice(0, 3));  
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Seção Hero */}
      <div className={styles.heroSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Crie, Compartilhe & Inspire o Mundo com Seus Posts.
          </h1>
          <p className={styles.desc}>
            Transforme suas ideias em realidade. Junte-se a uma comunidade de criadores e mostre sua criatividade.
          </p>
          <Button url="/blog/create-post" text="Crie Seu Primeiro Post" className={styles.ctaButton} />
        </div>
        <div className={styles.imageContainer}>
          <Image src={"/post1.jpg"} width={1000} height={500} alt="Imagem criativa" className={styles.img} />
        </div>
      </div>

      {/* Seção de Posts (Posts Recentes) */}
      <div className={styles.postsSection}>
        <h2 className={styles.subTitle}>Posts Recentes</h2>
        {loading ? (
          <p className={styles.message}>Carregando posts, por favor aguarde...</p>
        ) : error ? (
          <p className={styles.errorMessage}>Erro ao carregar posts: {error}</p>
        ) : posts.length === 0 ? (
          <div className={styles.noPostsMessage}>
            <h3>Nenhum post foi publicado ainda!</h3>
            <p>Seja o primeiro a criar um post e compartilhar seus pensamentos com o mundo.</p>
            <Button url="/blog/create-post" text="Crie um Post Agora" className={styles.createPostButton} />
          </div>
        ) : (
          <div className={styles.postGrid}>
            {posts.map((post) => (
              <Link href={`/blog/${post._id}`} key={post._id} passHref>
                <div className={styles.postCard}>
                  <h3>{post.title}</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.description || post.content.substring(0, 100) + "..." }}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Seção de Funcionalidades */}
      <div className={styles.featuresSection}>
        <h2 className={styles.subTitle}>Por Que Nos Escolher?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <h3>Fácil de Usar</h3>
            <p>Crie e compartilhe posts em apenas alguns cliques.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Personalizável</h3>
            <p>Personalize seus posts com nossas ferramentas de edição.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Comunidade Colaborativa</h3>
            <p>Junte-se a uma comunidade vibrante de pensadores criativos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
