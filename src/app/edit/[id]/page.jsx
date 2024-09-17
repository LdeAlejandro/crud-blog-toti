'use client'
import styles from "./page.module.css";
import Image from "next/image";
import connect from "@/utils/db";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import Post from "@/models/Post";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
// Aleksandr



const EditPostPage =  ({params}) => {

  const { id } = params;
  const [post, setPost] = useState(null)
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const getPost = async (id) => {
  //   try {

  //     const res = await fetch(`/posts/${id}`)
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     const data = await res.json()
     
      
  //     console.log(data)
  //     if (!data) {
  //       return notFound();
  //     }
      
  //     setPost(data)
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // console.log(post)

  useEffect(() => {

    const getPost = async (id)=> {
      try {

        const data = await fetch(`/posts/${id}`)
        console.log("ok")
  
        if (data.status === 201) {
          const post = await data.json() 
          
            setPost(post)
          } else {
            setPost(null) 
          }
        }     
       catch (error) {
        console.log(error)
      }   
    }

    if(id) getPost(id)
  }, [])


  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPostData)
    })
  
      if (res.ok) {
          alert("O post foi editado com sucesso")
          router.push("/postId")
        } else {
          alert("Erro ao editar o post.");
        }
    } catch (err) {
      console.log(err);
      alert("Erro do lado de servidor.");
    }
  }

  
  

// Equipe Frontend
  return (
    <div className={styles.container}>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Editar o post:</h1>
        <input type="text" placeholder="Título" className={styles.input} />
        {erros.title && <p className={styles.error}>{erros.title}</p>}
        <input type="text" placeholder="URL da imagem" className={styles.input} />
        {erros.img && <p className={styles.error}>{erros.img}</p>}

        <ReactQuill
          value={content}
          onChange={setContent}
          className={styles.textEditor}
          placeholder="Escreva o conteúdo aqui..."
        />
        {erros.content && <p className={styles.error}>{erros.content}</p>}
        
        <button
          type="button"
          className={styles.emojiButton}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊 Adicionar Emoji
        </button>

        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

        <button className={styles.button}>Enviar</button>
      </form>       
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{mensagem}</p>
          </div>
        </div>
      )}
    </div>
         
  );
};

export default EditPostPage