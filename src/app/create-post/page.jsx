"use client"
import { useSession } from "next-auth/react"
import styles from "./page.module.css"
import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import Image from "next/image"
import dynamic from "next/dynamic"
import EmojiPicker from "emoji-picker-react"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/
  return urlRegex.test(url)
}


const CreatePostPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);




  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, isLoading } = useSWR(
    `api/posts?username=${session?.user?.name}`,
    fetcher
  );

  useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/account/login");
    }
}, [status, router]);


  if (status === "loading") {
    return <p>Carregando...</p>;
  }


  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    let img = e.target[1].value;
    
    const novosErros = {};
    if (!title) novosErros.title = "O título é obrigatório.";
    // if (!desc) novosErros.desc = "A descrição é obrigatória.";
    if (!img || !isValidUrl(img)) {
      img = "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
      novosErros.img = "A URL da imagem é obrigatória e deve ser uma URL válida.";
    }
    if (!content) novosErros.content = "O conteúdo é obrigatório.";

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }



    try {
  
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          // desc,
          img,
          content,
          name: session.user.name,
        }),
      });

      if (res.ok) {
        setMensagem("Post criado com sucesso.");
        mutate();
        e.target.reset();
        setContent("");
        router.push("/")
      } else {
        setMensagem("Erro ao criar o post.");
      }
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      setMensagem("Erro ao criar o post.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await fetch(`/api/posts/${id}`, {
  //       method: "DELETE",
  //     });
  //     mutate();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const toggleExpand = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "Carregando..."
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    {post.img && (post.img.startsWith("http://") || post.img.startsWith("https://")) ? (
                      <Image
                        src={post.img}
                        alt={post.title}
                        width={200}
                        height={100}
                        // objectFit="cover"
                      />
                    ) : (
                      <Image
                        src="/default-image.jpg"
                        alt="Imagem padrão"
                        width={200}
                        height={100}
                        // objectFit="cover"
                      />
                    )}
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDesc}>{post.desc}</p>
                  <div className={styles.postContent}>
                    {expandedPostId === post._id ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content.substring(0, 100) + "...",
                        }}
                      />
                    )}
                    <button
                      className={styles.moreButton}
                      onClick={() => toggleExpand(post._id)}
                    >
                      {expandedPostId === post._id ? "Mostrar menos" : "Mais..."}
                    </button>
                  </div>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>

        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Adicionar novo post</h1>
          <input type="text" placeholder="Título" className={styles.input} />
          {erros.title && <p className={styles.error}>{erros.title}</p>}
          {/* <input type="text" placeholder="Descrição" className={styles.input} />
          {erros.desc && <p className={styles.error}>{erros.desc}</p>} */}
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
  }

  return null;
};

export default CreatePostPage
