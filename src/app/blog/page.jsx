import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";



  // Aleksandr

const Blog = ()=>{
  return (
    // Equipo front-end
    <div className={styles.mainContainer}>
     
        <Link href={`/blog/1`} className={styles.container} key={1}>
          <div className={styles.imageContainer}>
            <Image
              src=""
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>titulo</h1>
            <p className={styles.desc}>desc</p>
          </div>
        </Link>
   
    </div>
  );
};

export default Blog;