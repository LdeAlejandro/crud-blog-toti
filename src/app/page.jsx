
//import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Posts from "@/components/Posts/Posts";

const Blog  = async({ searchParams }) => {
  const sortOrder = searchParams.sort || "newest"; 
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '10';
  const searchTerm = searchParams['search'] ?? '';

 const urlForSorterComponent = (`${process.env.SITE_URL}/?page=${page}&per_page=${per_page}&search=${searchTerm}`);

  return (
    <div>
      {/* Barra de filtros */}
      <div className={styles.filterBar}>
        <Button btnClass={`${styles.filterButton} ${sortOrder === "newest" ? styles.active : ""}`} text={"Mais recentes"} url={`${urlForSorterComponent}&sort=newest`}/>
        <Button btnClass={`${styles.filterButton} ${sortOrder === "oldest" ? styles.active : ""}`} text={"Mais antigos"} url={` ${urlForSorterComponent}&sort=oldest`}/>
      
      </div>
    

      {/* Verificar se não há posts */}
      <Posts/>
      
    </div>
  );
};

export default Blog;