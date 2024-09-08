import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

// Aleksandr

const BlogEdit = async () => {

// Equipe Frontend
  return (
    <div className={styles.container}>

          <h1 className={styles.title}>Editar post</h1>
          <form action="">
          Titulo
          <input type="text" className={styles.title} placeholder="Titulo"/>
          desc
          <input type="text"   placeholder="Desc" className={styles.desc}/>
          imagem
          <input type="text"  placeholder="IMG" />
          nome
            <input type="text" placeholder="Author"  className={styles.name}/>

      <input type="text" className={styles.content}/>
      content
        <input placeholder="content" className={styles.text}/>
        <button>Atualizar</button>
        </form>
    </div>
  );
};

export default BlogEdit;