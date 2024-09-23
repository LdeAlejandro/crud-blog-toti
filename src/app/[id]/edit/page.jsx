'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation";
import EmojiPicker from "emoji-picker-react"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const EditPostPage = () => {

  const [post, setPost] = useState(null);
    const [erros, setErros] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [content, setContent] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {id} = useParams()

  

  useEffect(() => {
    const getPost = async (id)=> {
      try {
        const data = await fetch(`/api/posts/${id}`) 
        if (data.status === 200) {
          const res = await data.json() 
            setPost(res)
            setContent(res.content || "")
          } else {
            setPost(null) 
          }
        }     
       catch (error) {
        console.log(error)
      }      
    }
    getPost(id)  
  }, [])


   const handleSubmit = async () => {
    e.preventDefault();
    const newTitle = e.target[0].value;
    const newImg = e.target[1].value;

    console.log(id)

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newTitle,
          newImg,
          content
        })
    })
  
      if (res.ok) {
          alert("O post foi editado com sucesso")
          router.push(`/${id}`)
        } else {
          alert("Erro ao editar o post.");
        }
    } catch (err) {
      console.log(err);
      alert("Erro do lado de servidor.");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  return (
    <div className={styles.container}>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Editar o post:</h1>
        <input 
          type="text"
          name="title" 
          placeholder="Título" 
          className={styles.input}
          value={post?.title}
          onChange={handleChange} 
        />
        {erros.title && <p className={styles.error}>{erros.title}</p>}
        <input 
          type="text"
          name="img" 
          placeholder="URL da imagem" 
          className={styles.input}
          value={post?.img}
          onChange={handleChange}  
        />
        {erros.img && <p className={styles.error}>{erros.img}</p>}

        <ReactQuill
          value={content}
          onChange={setContent}
          className={styles.textEditor}
          placeholder="Escreva o conteúdo aqui..."
        />
        {erros.content && <p className={styles.error}>{erros.content}</p>}
        <div className="formButtons">
        <button
          type="button"
          className={styles.emojiButton}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊 Adicionar Emoji
        </button>

        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

        <button className={styles.submitButton}>Enviar</button>
        </div>
      </form>       
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{mensagem}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditPostPage