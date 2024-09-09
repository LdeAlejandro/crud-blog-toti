"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css";

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const post = await res.json();
        setFormData({
          title: post.title,
          description: post.description,
          imageUrl: post.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log("Post updated successfully");
        router.push("/blog");
      } else {
        console.error("Error updating post");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    router.push("/blog");
  };

  return (
    <div className={styles.container}>
      <h1>Edit Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.description && <p className={styles.error}>{errors.description}</p>}
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
