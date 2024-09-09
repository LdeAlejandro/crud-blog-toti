"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import EmojiPicker from "emoji-picker-react";
import styles from "./page.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['emoji'],
    ],
  },
};

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    username: "",
  });
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const router = useRouter();

  // Función para validar el formato de la URL
  const isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/; // Expresión regular para validar URLs
    return urlRegex.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, imageUrl, username } = formData;
   
    const img = isValidUrl(imageUrl)
      ? imageUrl
      : "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";

    const newErrors = {};
    if (!title) newErrors.title = "The title is required.";
    if (!description) newErrors.description = "The description is required.";
    if (!content) newErrors.content = "The content is required.";
    if (!username) newErrors.username = "The author's name is required.";

        if (!isValidUrl(imageUrl)) {
      newErrors.imageUrl = "Invalid URL. Example: https://example.com/image.jpg";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 3000); 
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: description,
          img,
          content,
          username,
        }),
      });

      if (res.ok) {
        setMessage("Post created successfully.");
        e.target.reset();
        setContent("");
        router.push("/blog");
      } else {
        setMessage("Error creating the post.");
      }

      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      setMessage("Error creating the post.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  const handleCancel = () => {
    router.push("/blog");
  };

  return (
    <div className={styles.container}>
      <h1>Create a New Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        {/* Image URL */}
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.imageUrl && <p className={styles.error}>{errors.imageUrl}</p>}

        {/* Author */}
        <input
          type="text"
          name="username"
          placeholder="Author"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        {/* Editor de texto */}
        <div className={styles.editorWrapper}>
          <ReactQuill
            value={content}
            onChange={setContent}
            className={styles.textEditor}
            placeholder="Write the content here..."
            modules={modules}
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>

        {/* Emoji Picker */}
        <div className={styles.emojiWrapper}>
          <button
            type="button"
            className={styles.emojiButton}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className={styles.emojiPickerWrapper}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
              <button
                className={styles.closeEmojiButton}
                onClick={() => setShowEmojiPicker(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Publish Post
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
